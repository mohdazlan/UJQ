const express = require('express');

const router = express.Router();

const Document = require('../models/document.model');
const Author = require('../models/author.model');

// All Document Route
router.get('/', async (req, res) => {
  res.send('All books');
});

router.post('/', async (req, res) => {
  const document = new Document({
    title: req.body.title,
  });
  try {
    const newDocument = await document.save();
    res.redirect('documents');
  } catch (error) {
    res.render('documents/new', {
      title,
      errorMessage: 'Error creating documents',
    });
  }
});

// New Document Route
router.get('/new', async (req, res) => {
  try {
    const authors = await Author.find({});
    const document = new Document();
    res.render('documents/new', {
      // we are going to pass two vars that we created above
      authors,
      document,
    });
  } catch (error) {
    res.redirect('/documents');
  }
});

module.exports = router;
