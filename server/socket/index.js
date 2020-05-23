const _ = require('lodash');
const http = require('http');
const socketIO = require('socket.io');
const logger = require('../logger');
const SocketMessage = require('../../src/lib/MessageNames');
const { List } = require('../models');
const ListManager = require('./ListManager');
const RoomManager = require('./RoomManager');

const listMask = (list) => ({
  ..._.partial(_.pick, _, ['_id', 'name'])(list)
})

module.exports = ({ app, expressSession }) => {
  const server = http.Server(app);
  const io = socketIO(server);
  app.io = io;

  io.on('connection', (socket) => {
    logger.debug("A user has connected!");
    const mListManager = new ListManager(io, socket);
    const mRoomManager = new RoomManager(io, socket);

    List.find().then((lists) => {
      socket.emit(SocketMessage.UPDATE_LISTS, lists.map(listMask));
    });
    
    const socketMiddleware = {
      [SocketMessage.CREATE_LIST]: mListManager.createList,
      [SocketMessage.DELETE_LIST]: mListManager.deleteList,
      [SocketMessage.SELECT_LIST]: mListManager.selectList,
      [SocketMessage.JOIN_LIST_ROOM]: mRoomManager.joinRoom,
      [SocketMessage.LEAVE_LIST_ROOM]: mRoomManager.leaveRoom,
      [SocketMessage.ADD_ENTRY]: mRoomManager.addEntry,
      [SocketMessage.DELETE_ENTRY]: mRoomManager.deleteEntry,
    }

    // Register middleware
    for (const [messageName, middleware] of Object.entries(socketMiddleware)) {
      socket.on(messageName, middleware);
    }
  });

  // io.use(expressSocketSession)
  return server;
}
