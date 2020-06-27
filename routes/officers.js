const express = require('express');

const router = express.Router();
const Officer = require('../models/officer.model');

// All officer route
router.get('/', async (req, res) => {
//  const searchOptions = {};
//  if (req.query.name != null && req.query.name !== '') {
//    searchOptions.name = new RegExp(req.query.name, 'i');
//  }
//  try {
//    const officers = await Officer.find({ searchOptions });
//    res.render('officers/index', {
//      officers,
//      searchOptions: req.query,
//    });
//  } catch (error) {
//    res.redirect('/');
//  }
    try {
    const officers = await Officer.find({});
    res.render('officers/index', { officers });
  } catch (error) {
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
  // this officer variable will hold the Officer model
  res.render('officers/new', { officer: new Officer() });
});

router.post('/', (req, res) => {
  const officer = new Officer({
    name: req.body.name,
  });
  officer.save((err, newOfficer) => {
    if (err) {
      res.render('officers/new', {
        officer,
        errorMessage: 'Error creating Officer',
      });
    } else {
      // res.redirect(`officers/${newOfficer.id}`)
      res.redirect('officers');
    }
  });
  // res.send(req.body.name);
});
module.exports = router;
