const express = require('express');

const router = express.Router();
const Officer = require('../models/officer.model');

// All officer route
router.get('/', async (req, res) => {
  const searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const officers = await Officer.find(searchOptions);
    res.render('officers/index', {
      officers:officers,
      searchOptions: req.query,
    });
  } catch (error) {
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  const officer = new Officer({
    name: req.body.name,
  });
  try {
    const newOfficer = await officer.save();
    res.redirect('officers');
  } catch (error) {
    res.render('officers/new', {
      officer,
      errorMessage: 'Error creating Officer',
    });
  }
});

router.get('/new', (req, res) => {
  // this officer variable will hold the Officer model
  res.render('officers/new', { officer: new Officer() });
});


module.exports = router;
