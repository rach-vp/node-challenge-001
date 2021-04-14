const passport = require('passport');
const User = require('../models/users');
const tokens = require('../tokens');

module.exports = {
  local: (req, res, next) => {
    passport.authenticate(
      'local',
      { session: false },
      (error, user) => {
        if (error) return next(error);

        req.user = user;
        req.authenticated = true;
        return next();
      },
    )(req, res, next);
  },

  bearer: (req, res, next) => {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, user, info) => {
        if (error) return next(error);

        req.token = info.token;
        req.user = user;
        req.authenticated = true;
        return next();
      },
    )(req, res, next);
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const id = await tokens.refresh.verify(refreshToken);
      await tokens.refresh.invalidate(refreshToken);
      req.user = await User.query().findById(id);
      return next();
    } catch (error) {
      return next(error);
    }
  },

  emailVerification: async (req, res, next) => {
    try {
      const { token } = req.params;
      const id = await tokens.emailVerification.verify(token);
      const user = await User.query().findById(id);

      req.user = user;
      return next();
    } catch (error) {
      return next(error);
    }
  },
};
