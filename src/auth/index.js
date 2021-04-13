const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/users');
const { InvalidArgumentError } = require('../errors');
const tokens = require('../tokens');

const validateUser = (user) => { if (!user) throw new InvalidArgumentError('User not found'); };
const validatePassword = async (password, hash) => {
  const validPassword = await bcrypt.compare(password, hash);
  if (!validPassword) throw new InvalidArgumentError('E-mail or password is incorrect');
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
        const id = await tokens.access.verify(token);
        const user = await User.query().findById(id);

        done(null, user, { token });
      } catch (error) {
        done(error);
      }
    },
  ),
);
