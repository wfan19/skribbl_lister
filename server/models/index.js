const mongoose = require('mongoose');
const List = require('./List');

module.exports = {
  List: mongoose.model('List', List, 'lists'),
};
