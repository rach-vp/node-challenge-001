const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const User = require('../models/users');
const { blocklist, allowlistRefreshToken } = require('../redis');

const createPasswordHash = async (password) => bcrypt.hash(password, Number(process.env.HASH_COST));

const createJWT = (user) => jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '15m' });

const createOpaqueToken = async (user) => {
  const opaqueToken = crypto.randomBytes(24).toString('hex');
  const expirationDate = moment().add(5, 'd').unix();
  await allowlistRefreshToken.add(opaqueToken, user.id, expirationDate);
  return opaqueToken;
};

module.exports = {
  async createUser(req, res) {
    try {
      const { email, password } = req.body;

      const userPasswordHash = await createPasswordHash(password);
      const user = await User.query().insert({
        email,
        password: userPasswordHash,
      });

      res.status(201).json({
        message: 'User successfully created',
        user: { id: user.id, email },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    const { user } = req;
    const accessToken = createJWT(user);
    const refreshToken = await createOpaqueToken(user);
    res.set('Authorization', accessToken);
    res.status(200).json({ refreshToken });
  },

  async logout(req, res) {
    try {
      const { token } = req;
      await blocklist.add(token);
      res.status(204).json({ message: 'user succesfully logged out' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async listUsers(req, res) {
    try {
      const users = await User.query();

      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
