const bcrypt = require('bcrypt');
const User = require('../models/users');

const passwordHash = async (password) => bcrypt.hash(password, Number(process.env.HASH_COST));

module.exports = {
  async createUser(req, res) {
    const { email, password } = req.body;

    try {
      const userPasswordHash = await passwordHash(password);
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
    res.status(204).json();
  },
};
