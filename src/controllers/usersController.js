const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const blocklist = require('../redis/blocklistHandling');

const createPasswordHash = async (password) => bcrypt.hash(password, Number(process.env.HASH_COST));

const createJWT = (user) => jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '15m' });

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
    const token = createJWT(req.user);
    res.set('Authorization', token);
    res.status(204).json();
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
