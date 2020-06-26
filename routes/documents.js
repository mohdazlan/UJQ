const express = require('express');

const router = express.Router();

const Document = require('../models/document.model');

router.get('/', (req, res) => {
  res.send('Hello World');
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
module.exports = router;
