const mongoose = require('mongoose');

const coverImageBasePath = 'uploads/documentCovers';
// this will be in public folder
const documentSchema = new mongoose.Schema({
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
  coverImageName: {
    type: String,
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Author',
  },
});

// 'Officer will be the name of the table in my database
module.exports = mongoose.model('Document', documentSchema);
module.exports.coverImageBasePath = coverImageBasePath;
