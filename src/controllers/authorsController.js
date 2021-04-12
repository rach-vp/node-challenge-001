const Author = require('../models/authors');

module.exports = {
  listAuthors: async (req, res) => {
    try {
      const users = await Author.query();

      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
