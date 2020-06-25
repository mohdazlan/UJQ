const express = require('express');

const router = express.Router();

// All officer route
router.get('/', (req, res) => {
  res.render('officers/index');
});

router.get('/new', (req, res) => {
  res.render('officers/new');
});

router.post('/new', (req, res) => {
  res.render('officers/new');
});
module.exports = router;
