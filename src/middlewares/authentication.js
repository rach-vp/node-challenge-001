const passport = require('passport');

module.exports = {
  local: (req, res, next) => {
    passport.authenticate(
      'local',
      { session: false },
      (error, user) => {
        if (error) {
          if (error.name === 'InvalidArgumentError') {
            return res.status(401).json({ error: error.message });
          }
          return res.status(500).json({ error: error.message });
        }

        if (!user) {
          return res.status(401).json();
        }

        req.user = user;
        return next();
      },
    )(req, res, next);
  },

  bearer: (req, res, next) => {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, user) => {
        if (error) {
          if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: error.message });
          } if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
              error: error.message,
              expiredAt: error.expiredAt,
            });
          }
          return res.status(500).json({ error: error.message });
        }

        if (!user) {
          return res.status(401).json();
        }

        req.user = user;
        return next();
      },
    )(req, res, next);
  },
};
