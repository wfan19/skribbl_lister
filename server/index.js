const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('getconfig');
const logger = require('./logger');

const init = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

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
