const http = require('http');
const socketIO = require('socket.io');
const { List } = require('../models');
const logger = require('../logger');

module.exports = ({ app, expressSession }) => {
  const server = http.Server(app);
  const io = socketIO(server);
  app.io = io;

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

  // io.use(expressSocketSession)
  return server;
}
