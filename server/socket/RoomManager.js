const logger = require('../logger');
const SocketMessage = require('../../src/lib/MessageNames');
const { List } = require('../models');

class RoomManager {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  emitToAllInRoom(messageName, data){
    logger.debug(`[emitToAllInRoom()] Emitting ${data} to room ${this.socket.listCode}`);
    this.io.in(this.socket.listCode).emit(messageName, data);
  }

  joinRoom = async (id) => {
    const list = await List.findById(id);
    if (!list) {
      logger.error(`[JOIN_ROOM] ${this.socket.id} joined room ${id} but room not found!`);
      return;
    }
    logger.debug(`[JOIN_ROOM] ${this.socket.id} joining room ${list._id}`);
    this.socket.join(list.accessCode, async () => {
      logger.debug(`[JOIN_ROOM] ${this.socket.id} joined room with id ${id}`);
      this.socket.listCode = list.accessCode;
      this.socket.listId = list._id;
    });
  };

  leaveRoom = async () => {
    if (this.socket.listId) {
      this.socket.leave(this.socket.listCode, async () => {
        logger.debug(`[LEAVE_ROOM] Socket ${this.socket.id} left room ${this.socket.listId}`);
        delete this.socket.listId;
        delete this.socket.listCode;
      })
    } else {
      logger.debug(`[LEAVE_ROOM] ${this.socket.id} attempting to leave room while not in one`);
    }
  };

  addEntry = async (entry) => {
    if (this.socket.listId) {
      logger.debug(`[ADD_ENTRY] Socket ${this.socket.id} adding ${entry} to list ${this.socket.listId}`);
      const list = await List.findById(this.socket.listId);
      const updatedList = await list.addEntry(entry , []);
      const newEntry = updatedList.entries[updatedList.entries.length - 1];
      this.emitToAllInRoom(SocketMessage.ENTRY_ADDED, newEntry);
    } else {
      logger.error(`[ADD_ENTRY] ${this.socket.id} attempting to add entry to room while not in one`);
    }
  };

  deleteEntry = async (id) => {
    if (this.socket.listId) {
      logger.debug(`[DELETE_ENTRY] Socket ${this.socket.id} deleteing ${id} from list ${this.socket.listId}`);
      const list = await List.findById(this.socket.listId);
      await list.deleteEntry(id);
      this.emitToAllInRoom(SocketMessage.ENTRY_DELETED, id);
    } else {
      logger.error(`[DELETE_ENTRY] Socket ${this.socket.id} attempting to delete entry from room while not in one`);
    }
  }
}

module.exports = RoomManager;