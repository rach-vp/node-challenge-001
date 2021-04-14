const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require('../models/users');
const tokens = require('../tokens');
const { VerificationEmail } = require('../emails');

const createPasswordHash = async (password) => bcrypt.hash(password, Number(process.env.HASH_COST));

module.exports = {
  async createUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const userPasswordHash = await createPasswordHash(password);
      const user = await User.query().insert({
        email,
        password: userPasswordHash,
      });

      const verificationToken = tokens.emailVerification.create(user.id);
      const address = `${process.env.API_ADDRESS}/users/verify-email/${verificationToken}`;
      const verificationEmail = new VerificationEmail(user.email, address);
      verificationEmail.sendEmail(user.email).catch(console.log);

      res.status(201).json({
        message: 'User successfully created',
        user: { id: user.id, email },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { id } = req.user;
      const accessToken = tokens.access.create(id);
      const refreshToken = await tokens.refresh.create(id);
      res.set('Authorization', accessToken);
      res.status(200).json({ refreshToken });
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const { token } = req;
      await tokens.access.invalidate(token);
      res.status(204).json({ message: 'user succesfully logged out' });
    } catch (error) {
      next(error);
    }
  },

  async listUsers(req, res, next) {
    try {
      const users = await User.query();

      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { id } = req.user;
      await User.query().patchAndFetchById(
        id,
        {
          email_verified: true,
          updated_at: moment(),
        },
      );

      res.status(201).json({ message: 'user successfully verified' });
    } catch (error) {
      next(error);
    }
  },
};
