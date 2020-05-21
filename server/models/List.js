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

List.methods.createWord = function (word, tags) {
  return ({
    word: word,
    tags: tags,
  });
}

List.methods.addWord = function (word, tags) {
  logger.debug(`Adding word ${word}, with tags ${tags}`);
  const newWord = this.createWord(word, tags);
  logger.debug(`New word created: ${JSON.stringify(newWord)}`);
  this.entries = this.entries.concat([newWord]);
  return this.save();
};

module.exports.List = List;
