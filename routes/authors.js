const express = require('express');
const Author = require('../models/author.model');

const router = express.Router();
// All Authors Route
router.get('/', async (req, res) => {
  // res.send('Hello World');
  try {
    const authors = await Author.find({});
    res.render('authors/index', { authors });
  } catch (error) {
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});
// author var will be available to our ejs file

router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  }); try {
    const newAuthor = await author.save();
    res.redirect('authors');
  } catch (error) {
    res.render('authors/new', {
      author,
      errorMessage: 'Error creating Author',
    });
  }
});

// router.post('/', (req, res) => {
//   const author = new Author({
//     name: req.body.name,
//   });
//   author.save((err, newAuthor) => {
//     if (err) {
//       res.render('authors/new', {
//         author,
//         errorMessage: 'Error creating Author',
//       });
//     } else {
//       res.redirect('authors');
//     }
//   });
//   // res.send('Create');
//   // res.send(req.body.name);
// });
module.exports = router;
