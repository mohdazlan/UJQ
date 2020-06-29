const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const Author = require('../models/author.model');
const Book = require('../models/book.model');

const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['images/jpeg', 'images/png'];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

// All Books Route
router.get('/', async (req, res) => {
  res.send('All Books');
});

// New Book Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Book());
});

// Create Book Route
router.post('/', upload.single('cover'), async (req, res) => {
  // res.send('Create Books');
  const fileName = req.file != null ? req.file.filename : null;
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    // coverImageName: fileName,
    description: req.body.description,
  });
  try {
    const newBook = await book.save();
    res.redirect('books/new');
  } catch (error) {
    console.log(error);
    renderNewPage(res, book, true);
  }
});

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = { authors, book };
    if (hasError) params.errorMessage = 'Error Creating Book';
    res.render('books/new', params);
  } catch (error) {
    res.redirect('books');
  }
}
module.exports = router;
