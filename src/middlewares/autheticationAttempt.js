const authentication = require('./authentication');

module.exports = (req, res, next) => {
  req.autheticated = false;

  if (req.get('Authorization')) {
    return authentication.bearer(req, res, next);
  }

  return next();
};
