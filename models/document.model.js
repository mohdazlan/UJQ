const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

// 'Officer will be the name of the table in my database
module.exports = mongoose.model('Document', documentSchema);