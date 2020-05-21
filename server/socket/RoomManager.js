const logger = require('../logger');
const SocketMessage = require('../../src/lib/MessageNames');
const { List } = require('../models');

class RoomManager {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  joinRoom = async (id) => {
    const room = await List.findById(id);
    if (!room) {
      logger.error(`Attempting to join room with id ${id} but room not found!`);
      return;
    }
    logger.debug(`Socket ${this.socket.id} joining room ${room.accessCode}`);
    this.socket.join(room.accessCode, async () => {
      logger.debug(`Socket ${this.socket.id} joined room with id ${id}`);
      this.socket.roomId = room.accessCode;
      this.socket.room = room;
    });
  }

  leaveRoom = async () => {
    if (this.socket.room) {
      this.socket.leave(this.socket.room.accessCode, async () => {
        logger.debug(`Socket ${this.socket.id} left room with id ${this.socket.roomId}`);
        delete this.socket.room;
        delete this.socket.roomId;
      })
    } else {
      logger.debug(`Socket ${this.socket.id} attempting to leave room while not in one`);
    }
  }

}

module.exports = RoomManager;