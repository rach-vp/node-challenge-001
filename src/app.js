require('dotenv').config();
require('./auth');
require('./redis/blocklistAccessToken');
require('./redis/allowlistRefreshToken');

const express = require('express');
const helmet = require('helmet');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || '8080';

app.use(helmet());
app.use(express.json());

app.use('/api', routes);

app.listen(
  port,
  () => console.log(`API running on port ${port}`),
);

module.exports = app;
