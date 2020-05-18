const _ = require('lodash');
const http = require('http');
const socketIO = require('socket.io');
const logger = require('../logger');
const SocketMessage = require('../../src/lib/MessageNames');
const { List } = require('../models');

const listMask = (list) => ({
  ..._.partial(_.pick, _, ['_id', 'name', 'entries'])
})

module.exports = ({ app, expressSession }) => {
  const server = http.Server(app);
  const io = socketIO(server);
  app.io = io;

  io.on('connection', (socket) => {
    logger.debug("A user has connected!");
    List.find().then((lists) => {
      socket.emit(SocketMessage.UPDATE_LISTS, lists.map(listMask));
    })

    // TODO: Names aren't saving
    socket.on(SocketMessage.CREATE_LIST, async (options) => {
      optionsObj = options.options;
      logger.debug(`List.name = ${optionsObj.name}`);
      const listTemp = new List({
        name: optionsObj.name,
      })
      logger.debug(`List document: ${JSON.stringify(listTemp.inspect())}`);
      const listOut = await listTemp.save();
      logger.debug(`New list created: ${JSON.stringify(listOut)}`);
      io.emit(SocketMessage.LIST_CREATED, listOut);
    })

    socket.on(SocketMessage.DELETE_LIST, async (id) => {
      Lists.deleteOne({_id: id}).then((res) => {
        io.emit(SocketMessage.LIST_DELETED, id);
      })
    })

  });

  // io.use(expressSocketSession)
  return server;
}
