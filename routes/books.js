const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const Author = require('../models/author.model');
const Book = require('../models/book.model');

const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['image/jpeg', 'image/png'];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

// All Books Route
router.get('/', async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishedDate', publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.lte('publishedDate', publishedAfter);
  }
  try {
    // const books = await query.exec()
    const books = await Book.find({});
    res.render('books/index', {
      books, searchOptions: req.query,
    });
  } catch (error) {
    res.redirect('/');
  }
});

// New Book Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Book());
});

// Create Book Route
router.post('/', async (req, res) => {
  // res.send('Create Books');
  const fileName = req.file != null ? req.file.filename : null;
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
  });
  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save();
    res.redirect('books');
  } catch (error) {
    console.log(error);
    // if (book.coverImageName != null) { removeBookCover(book.coverImageName); }
    renderNewPage(res, book, true);
  }
});

// function removeBookCover(fileName) {
//   fs.unlink(path.join(uploadPath, fileName), (err) => {
//     if (err) console.error(err);
//   });
// }

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

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64');
    book.coverImageType = cover.type;
  }
}

module.exports = router;
