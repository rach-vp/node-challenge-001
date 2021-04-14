require('dotenv').config();
require('./auth');
require('./redis/blocklistAccessToken');
require('./redis/allowlistRefreshToken');

const express = require('express');
const helmet = require('helmet');
const { InvalidArgumentError } = require('./errors');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || '8080';

app.use(helmet());
app.use(express.json());

app.use('/api', routes);

app.use((error, req, res) => {
  const body = { message: error.message };
  switch (error.constructor) {
    case InvalidArgumentError:
      return res.status(401).json(body);
    default:
      return res.status(500).json(body);
  }
});

app.listen(
  port,
  () => console.log(`API running on port ${port}`),
);

module.exports = app;
