const express = require('express');
const Author = require('../models/author.model');
const Book = require('../models/book.model');
const router = express.Router();
// All Authors Route
router.get('/', async (req, res) => {
  // res.send('Hello World');
  const searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', {
      authors,
      searchOptions: req.query,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  }); try {
    const newAuthor = await author.save();
    res.redirect('authors');
  } catch (error) {
    console.log(error);
    res.render('authors/new', {
      author,
      errorMessage: 'Error creating Author',
    });
  }
});

router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render('authors/show', {
      author: author,
      booksByAuthor:books
    })
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render('authors/edit', { author });
  } catch (error) {
    res.redirect('/authors');
  }
});

router.put('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch (error) {
    if (author == null) {
      res.redirect('/');
    } else {
      res.render('authors/edit', {
        author,
        errorMessage: 'Error updating Author',
      });
    }
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect('/authors');
  } catch (error) {
    if (author == null) {
      res.redirect('/');
    } else {
      res.redirect(`authors/${author.id}`);
    }
    console.log(error);
  }
});

module.exports = router;
