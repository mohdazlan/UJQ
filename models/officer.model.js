const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// 'Officer will be the name of the table in my database
module.exports = mongoose.model('Officer', officerSchema);
