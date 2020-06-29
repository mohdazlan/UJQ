const mongoose = require('mongoose');

// this will be in public folder
const coverImageBasePath = 'uploads/bookCovers';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // coverImageName: {
  //   type: String,
  //   required: true,
  // },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author',
  },
});

// 'Officer will be the name of the table in my database
module.exports = mongoose.model('Book', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;
