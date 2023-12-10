const BooksModel = require('../models/books.model');

const addBook = async (req, res) => {
  const { bookData } = req.body;

  try {
    await BooksModel.create(bookData);
    res.status(200).json({ message: 'Book added succesfully' });
  } catch (e) {}
  console.log(bookData);
};

const getAllBooks = async (req, res) => {
  try {
    const allBooksData = await BooksModel.find();
    console.log(allBooksData);
    res.status(200).json({ booksData: allBooksData });
  } catch (e) {
    console.log(e);
  }
};

const editBook = async (req, res) => {
  const bookId = req.params.id;
  const { data } = req.body;
  console.log(data);
  try {
    await BooksModel.findByIdAndUpdate(bookId, data);
    res.status(200).json({ message: `Book with the id ${bookId} is updated successfully.` });
  } catch (e) {
    console.log(e);
  }
};



module.exports = { getAllBooks, addBook, editBook };
