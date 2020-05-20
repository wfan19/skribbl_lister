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
  const mListManager = new ListManager(io);

  io.on('connection', (socket) => {
    logger.debug("A user has connected!");
    List.find().then((lists) => {
      socket.emit(SocketMessage.UPDATE_LISTS, lists.map(listMask));
    })
    
    const socketMiddleware = {
      [SocketMessage.CREATE_LIST]: mListManager.createList,
      [SocketMessage.DELETE_LIST]: mListManager.deleteList,
      [SocketMessage.SELECT_LIST]: mListManager.selectList,
    }

    for (const [messageName, middleware] of Object.entries(socketMiddleware)) {
      socket.on(messageName, middleware);
    }
  });

  // io.use(expressSocketSession)
  return server;
}
