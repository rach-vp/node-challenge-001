const User = require('../models/users');

module.exports = {
  async createUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.query().insert({ email, password });

      res.status(201).json({
        message: 'User successfully created',
        user: { id: user.id, email },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // async login(req, res) {
  //   const { email, password } = req.body;

  //   try {
  //     const user = await User.query().where({ email }).first();
  //     if (!user) {
  //       throw new Error('Permission denied');
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },
};
