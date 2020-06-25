const express = require('express');

const router = express.Router();
const Officer = require('../models/officer.model');

// All officer route
router.get('/', (req, res) => {
  res.render('officers/index');
});

router.get('/new', (req, res) => {
  // this officer variable will hold the Officer model
  res.render('officers/new', { officer: new Officer() });
});

router.post('/new', (req, res) => {
  res.render('officers/new');
});
module.exports = router;
