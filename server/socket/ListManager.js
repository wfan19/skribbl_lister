const _ = require('lodash');
const socketIO = require('socket.io');
const logger = require('../logger');
const SocketMessage = require('../../src/lib/MessageNames');
const { List } = require('../models');

class ListManager {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  createList = async (options) => {
    logger.debug(`List.name = ${options.name}`);
    const listTemp = new List({
      name: options.name,
    })
    logger.debug(`List document: ${JSON.stringify(listTemp.inspect())}`);
    const listOut = await listTemp.save();
    logger.debug(`New list created: ${JSON.stringify(listOut)}`);
    this.io.emit(SocketMessage.LIST_CREATED, listOut);
  }

  deleteList = async (id) => {
    logger.debug(`Deleting room with id ${id}`);
    List.deleteOne({_id: id}).then((res) => {
      this.io.emit(SocketMessage.LIST_DELETED, id);
    })
  }

  selectList = async (id) => {
    // logger.debug(`Looking for list with id ${id}`);
    List.findById(id).then((list) => {
      logger.debug(`Found list document: ${JSON.stringify(list)}`);
      this.socket.emit(SocketMessage.LIST_SELECTED, list);
    })
  }
}


module.exports = ListManager;