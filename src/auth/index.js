const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/users');
const { InvalidArgumentError } = require('../errors');
const { blocklist } = require('../redis');

const validateUser = (user) => { if (!user) throw new InvalidArgumentError('User not found'); };
const validatePassword = async (password, hash) => {
  const validPassword = await bcrypt.compare(password, hash);
  if (!validPassword) throw new InvalidArgumentError('E-mail or password is incorrect');
};
const validateTokenOnBlocklist = async (token) => {
  const isOnBlocklist = await blocklist.contains(token);
  if (isOnBlocklist) {
    throw new jwt.JsonWebTokenError('Invalid token by logout');
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.query().where({ email }).first();
        validateUser(user);
        await validatePassword(password, user.password);

        done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await validateTokenOnBlocklist(token);
        const { id } = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.query().findById(id);

        done(null, user, { token });
      } catch (error) {
        done(error);
      }
    },
  ),
);
