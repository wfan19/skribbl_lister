const _ = require('lodash');
const socketIO = require('socket.io');
const logger = require('../logger');
const SocketMessage = require('../../src/lib/MessageNames');
const { List } = require('../models');

class ListManager {
  constructor(io) {
    this.io = io;
  }

  createList = async (optionsAction) => {
    const optionsObj = optionsAction.options;
    logger.debug(`List.name = ${optionsObj.name}`);
    const listTemp = new List({
      name: optionsObj.name,
    })
    logger.debug(`List document: ${JSON.stringify(listTemp.inspect())}`);
    const listOut = await listTemp.save();
    logger.debug(`New list created: ${JSON.stringify(listOut)}`);
    this.io.emit(SocketMessage.LIST_CREATED, listOut);
  }

  deleteList = async (idAction) => {
    const id = idAction._id;
    logger.debug(`Deleting room with id ${id}`);
    List.deleteOne({_id: id}).then((res) => {
      this.io.emit(SocketMessage.LIST_DELETED, id);
    })
  }

  selectList = async (idAction) => {
    // logger.debug(`ID Action: ${JSON.stringify(idAction)}`);
    const id = idAction._id;
    // logger.debug(`Looking for list with id ${id}`);
    List.findById(id).then((list) => {
      logger.debug(`Found list document: ${JSON.stringify(list)}`);
      this.io.emit(SocketMessage.LIST_SELECTED, list);
    })
  }
}


module.exports = ListManager;