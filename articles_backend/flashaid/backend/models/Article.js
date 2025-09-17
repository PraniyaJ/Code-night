
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
