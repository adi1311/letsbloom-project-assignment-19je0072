const express = require("express");
const { getAllBooks, addBook, editBook } = require("../controller/books.controller");
const router = express.Router();

router.get("/api/v1/books", getAllBooks);
router.post("/api/v1/books", addBook);
router.patch("/api/v1/book/:id", editBook);

module.exports = router
