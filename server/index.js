const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('getconfig');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const logger = require('./logger');
const initSocket = require('./socket');

const init = async () => {
  const app = express();
  app.use(cors({
    origin: '*',
    credentials: true,
  }));
  app.use(bodyParser.json());

  logger.debug('[MONGODB] Attempting to connect to database.', { url: config.mongodb });
  await mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    logger.debug('[MONGODB] Connected to database.', { url: config.mongodb });
  }).catch((err) => {
    logger.error('[MONGODB] Error when connecting to database', err);
    process.exit();
  });

  app.set('trust proxy', 1);

  const sessionOptions = {
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  };
  const expressSession = session(sessionOptions);
  app.use(expressSession);

  initSocket({ app, expressSession }).listen(9000);

  app.listen(config.server.port, '0.0.0.0', () => {
    logger.debug(`Server is now running on ${config.server.port}`);
  });
};

try {
  const app = init();
  module.exports = app;
} catch (e) {
  logger.error(e);
}
