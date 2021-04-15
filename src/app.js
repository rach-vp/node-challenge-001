require('dotenv').config();
require('./auth');
require('./redis/blocklistAccessToken');
require('./redis/allowlistRefreshToken');

const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const { ForeignKeyViolationError } = require('objection');
const { InvalidArgumentError, AccessDenied, NotFoundError } = require('./errors');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || '8080';

app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  res.set({ 'Content-Type': 'application/json' });

  next();
});

app.use('/api', routes);

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  const body = { message: error.message };
  switch (error.constructor) {
    case InvalidArgumentError:
    case jwt.JsonWebTokenError:
    case AccessDenied:
      return res.status(401).json(body);
    case jwt.TokenExpiredError:
      body.expiredAt = error.expiredAt;
      return res.status(401).json(body);
    case NotFoundError:
      return res.status(404).json(body);
    case ForeignKeyViolationError:
      body.message = 'foreign key violation. check FK on the table';
      return res.status(404).json(body);
    default:
      return res.status(500).json(body);
  }
});

app.listen(
  port,
  () => console.log(`API running on port ${port}`),
);

module.exports = app;
