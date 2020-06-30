const express = require('express');

const Book = require('../models/book.model');

const router = express.Router();

router.get('/', async (req, res) => {
  // res.send('Hello World');
  let books = [];
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec();
  } catch (error) {
    console.log(error);
    books = []
  }
  res.render('index', { books });
});

module.exports = router;
