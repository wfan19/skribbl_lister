const _ = require('lodash');
const http = require('http');
const socketIO = require('socket.io');
const logger = require('../logger');
const SocketMessage = require('../../src/lib/MessageNames');
const { List } = require('../models');
const ListManager = require('./ListManager');

const listMask = (list) => ({
  ..._.partial(_.pick, _, ['_id', 'name', 'entries'])(list)
})

module.exports = ({ app, expressSession }) => {
  const server = http.Server(app);
  const io = socketIO(server);
  app.io = io;

  io.on('connection', (socket) => {
    logger.debug("A user has connected!");
    const mListManager = new ListManager(io, socket);

    List.find().then((lists) => {
      socket.emit(SocketMessage.UPDATE_LISTS, lists.map(listMask));
    });

    const joinRoom = async (id) => {
      logger.debug(`Trying to join socket to room ${id}`);
      const targetList = await List.findById(id);
      if(!targetList){
        logger.debug(`Room with id ${id} not found`)
        return;
      }
      socket.join(targetList.accessCode, async () => {
        logger.debug(`Socket joined room with id ${id}`);
        socket.roomId = targetList.accessCode;
        socket.room = targetList;
      })
    };

    const leaveRoom = async (id) => {
      if(socket.room){
        socket.leave(socket.room.accessCode, async () => {
          logger.debug(`Socket left room with id ${id}`);
        });
        delete socket.room;
        delete socket.roomId;
      } else {
        logger.debug("Socket attempting to leave room while not in one");
      }
    }
    
    const socketMiddleware = {
      [SocketMessage.CREATE_LIST]: mListManager.createList,
      [SocketMessage.DELETE_LIST]: mListManager.deleteList,
      [SocketMessage.SELECT_LIST]: mListManager.selectList,
      [SocketMessage.JOIN_LIST_ROOM]: joinRoom,
      [SocketMessage.LEAVE_LIST_ROOM]: leaveRoom,
    }

    // Register middleware
    for (const [messageName, middleware] of Object.entries(socketMiddleware)) {
      socket.on(messageName, middleware);
    }
  });

  // io.use(expressSocketSession)
  return server;
}
