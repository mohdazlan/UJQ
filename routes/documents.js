const express = require('express');
const multer = require('multer');

const router = express.Router();
const path = require('path');

const Document = require('../models/document.model');
const Author = require('../models/author.model');

const uploadPath = path.join('public', Document.coverImageBasePath);

const imageMimeTypes = ['images/jpeg', 'images/png'];

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

async function renderNewPage(res, document, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors,
      document,
    };
    if (hasError) params.errorMessage = 'Error creating document';
    res.render('documents/new', params);
  } catch (error) {
    console.log(error);
    res.redirect('/documents');
  }
}

// All Document Route
router.get('/', async (req, res) => {
  res.send('All books');
});

// New Document Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Document());
});

// Create Document Route
router.post('/', upload.single('cover'), async (req, res) => {
  const filename = req.file != null ? req.file.filename : null;
  const document = new Document({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImageName: filename,
    description: req.body.description,
  });
  try {
    const newDocument = await document.save();
    res.redirect('documents');
  } catch (error) {
    console.log(error);
    renderNewPage(res, document, true);
  }
});

module.exports = router;
