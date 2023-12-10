import { useState } from 'react';
import './App.css';
import { Layout, Space, Button, Modal, Form, Input, TextArea, Table, Spin } from 'antd';
import {EditOutlined} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { getAllBooks, createNewBook, editBook } from './api/index.js';

interface TableDataType {
  key: string;
  title: string;
  author: string;
  description: string;
  category: String;
}
function App() {
  const columns: ColumnsType<TableDataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditOnClick(record)}>Edit</Button>
        </Space>
      ),
    },
  ]
  const handleEditOnClick = (record:TableDataType) => {
    setFormMode("edit");
    setEditBookId(record.key);
    console.log("record", record);
    setCurrBookdata(record);
    setIsModalOpenEdit(true);
    
  }
  const [isfetchingBooks, setIsFetchingBooks] = useState(false);
  const [isCreatingNewBook, setIsCreatingNewBook] = useState(false);
  const [isEditingBook, setIsEditingBook] = useState(false);
  const [editBookid, setEditBookId] = useState(null);
  const [formMode, setFormMode] = useState("create");

  const [allBooksData, setAllBooksData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [bookData, setBookData] = useState({
    author: "",
    title: "",
    description: "",
    category: ""
  });
  const [currBookData, setCurrBookdata] = useState({
    author: "",
    title: "",
    description: "",
    category: ""
  });

  const getAllBooksOnClick = async () => {
    setIsFetchingBooks(true);
    setAllBooksData([]);
    try {
      let { data } = await getAllBooks();
      data = data?.booksData?.map((item) => ({...item, key: item?._id}));
      setAllBooksData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetchingBooks(false);
    }
  };

  const createNewBooksOnClick = async(data) => {
    setIsCreatingNewBook(true);
    try{ 
      await createNewBook({"bookData": data});
      handleCancel();
      getAllBooksOnClick();
    }catch(e) {
      console.log(e);
    }finally {
      setIsCreatingNewBook(false);
    }
  }

  const editBookOnClick = async(editBookData) => {
    setIsEditingBook(true);
    console.log(editBookData);
    const id = currBookData.key;
    try {
      await editBook({data: editBookData}, id);
      handleCancelEdit()
      getAllBooksOnClick();
      console.log("Book editted succesfully");
    }catch(e) {
      console.log(e);
    }finally {
      setIsEditingBook(false);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBookData({author: "", title: "", description: "", category: ""});
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
    setCurrBookdata({author: "", title: "", description: "", category: ""});
  };

  const onFinish = (values: any) => {
    createNewBooksOnClick(values);
  };

  const onFinishEdit = (values:any) => {
    editBookOnClick(values);
  }
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Layout.Content style={{ height: '100vh', display: 'flex' }}>
        <div className="content">
          {isfetchingBooks && <div className='spin-container'><Spin size='large'/></div>}
          {allBooksData && allBooksData.length && (
            <Table columns={columns} dataSource={allBooksData} />
          )}
        </div>
        <div className="action">
          <div className="button-group">
            <Button type="primary" onClick={getAllBooksOnClick}>
              Get all books
            </Button>
            <Button type="primary" onClick={showModal}>Insert a book</Button>
            <Modal title="Create Book" open={isModalOpen}  onCancel={handleCancel} footer={[
              <Button key="back" onClick={handleCancel}>Cancel</Button>
            ]}>
            <Form
              name="create-book-form"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={bookData}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input the title' }]}
              >
                <Input placeholder='Entert title'/>
              </Form.Item>
              <Form.Item
                label="Author"
                name="author"
                rules={[{ required: true, message: 'Please input the author' }]}
              >
                <Input placeholder='Entert author'/>
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
              >
                <Input.TextArea row={4} placeholder='Entert description'/>
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                defaultValue={""}
                rules={[{ required: true, message: 'Please input the category' }]}
              >
                <Input placeholder='Entert title'/>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            </Modal>
            <Modal title="Edit Book" open={isModalOpenEdit}  onCancel={handleCancelEdit} footer={[
              <Button key="back" onClick={handleCancelEdit}>Cancel</Button>
            ]}>
            <Form
              name="edit-book-form"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{
                author: currBookData.author,
                title: currBookData.title,
                description: currBookData.description,
                category: currBookData.category
              }}
              onFinish={onFinishEdit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input the title' }]}
              >
                <Input placeholder='Entert title'/>
              </Form.Item>
              <Form.Item
                label="Author"
                name="author"
                rules={[{ required: true, message: 'Please input the author' }]}
              >
                <Input placeholder='Entert author'/>
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
              >
                <Input.TextArea row={4} placeholder='Entert description'/>
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                defaultValue={""}
                rules={[{ required: true, message: 'Please input the category' }]}
              >
                <Input placeholder='Entert title'/>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            </Modal>
          </div>
          <img
            src="https://itkamtech.com/storage/uploads/blogs/library-slider-img-3_1653482722.jpg"
            alt="app-picture"
            className="app-img"
          />
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default App;
