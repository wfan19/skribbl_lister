const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const logger = require('../logger');

const Tag = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'blue',
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
    default: '',
  },
  entries: {
    type: [Entry],
    default: [],
  },
  accessCode: {
    type: String,
    default: uuidv4,
  },
});

List.methods.createEntry = function (word, tags) {
  return ({
    word: word,
    tags: tags,
  });
}

List.methods.addEntry = function (entry, tags) {
  const newEntry = this.createEntry(entry, tags);
  this.entries = this.entries.concat([newEntry]);
  return this.save();
};

List.methods.deleteEntry = function (_id) {
  this.entries = this.entries.filter((entry) => entry._id != _id);
  return this.save();
};

List.methods.changeName = function (name) {
  this.name = name;
  return this.save();
}

module.exports.List = List;
