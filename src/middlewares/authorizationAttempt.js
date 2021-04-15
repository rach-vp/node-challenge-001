const authorization = require('./authorization');

module.exports = (entity, action) => (req, res, next) => {
  if (req.authenticated) {
    return authorization(entity, action)(req, res, next);
  }

  return next();
};
