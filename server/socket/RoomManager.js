const logger = require('../logger');
const SocketMessage = require('../../src/lib/MessageNames');
const { List } = require('../models');

class RoomManager {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  emitToAllInRoom(messageName, data){
    logger.debug(`Emitting ${data} to room ${this.socket.listCode}`);
    this.io.in(this.socket.listCode).emit(messageName, data);
  }

  joinRoom = async (id) => {
    const list = await List.findById(id);
    if (!list) {
      logger.error(`Attempting to join room with id ${id} but room not found!`);
      return;
    }
    logger.debug(`Socket ${this.socket.id} joining room ${list._id}`);
    this.socket.join(list.accessCode, async () => {
      logger.debug(`Socket ${this.socket.id} joined room with id ${id}`);
      this.socket.listCode = list.accessCode;
      this.socket.list = list;
    });
  };

  leaveRoom = async () => {
    if (this.socket.list) {
      this.socket.leave(this.socket.listCode, async () => {
        logger.debug(`Socket ${this.socket.id} left room with id ${this.socket.list._id}`);
        delete this.socket.list;
        delete this.socket.listCode;
      })
    } else {
      logger.debug(`Socket ${this.socket.id} attempting to leave room while not in one`);
    }
  };

  // TODO: Fix entrys not saving under their proper lists
  addEntry = async (entry) => {
    if (this.socket.list) {
      // logger.debug(``)
      const updatedList = await this.socket.list.addEntry(entry , []);
      const newEntry = updatedList.entries[updatedList.entries.length - 1];
      logger.debug(`Broadcasting new entry ${JSON.stringify(newEntry)}`);
      this.emitToAllInRoom(SocketMessage.ENTRY_ADDED, newEntry);
    } else {
      logger.error(`Socket ${this.socket.id} attempting to add entry to room while not in one`);
    }
  };

}

module.exports = RoomManager;