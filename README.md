# letsbloom-project-assignment-19je0072

# Library Management API
This repository contains a simple RESTful API for managing a library system. The API interacts with a database to perform basic CRUD operations on books. Below are the details of three API endpoints with increasing complexity.

# Endpoint 1: Retrieve All Books
Endpoint
GET /api/books

Description
Retrieves a list of all books in the library from the database.

# Endpoint 2: Add a New Book
Endpoint
POST /api/books

Request Body
JSON object representing the new book.

Description
Allows the addition of a new book to the library.

# Endpoint 3: Update Book Details
Endpoint
PUT /api/books/{id}

Request Body
JSON object with updated book details.

Description
Allows updating the details of a specific book in the library.

# How to Use
1. Clone this repository to your local machine
2. Install dependencies.
3. npm install
4. Set up your database configuration in a .env file.
5. npm start
