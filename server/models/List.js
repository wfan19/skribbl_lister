const mongoose = require('mongoose');

const Tag = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'b0b0b0',
  },
});

const Entry = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  tags: {
    type: [Tag],
    default: [],
  },
});

const List = new mongoose.Schema({
  name: {
    type: String,
    default: 'unnamed-list',
  },
  entries: {
    type: [Entry],
    default: [],
  },
});

module.exports.List = List;
