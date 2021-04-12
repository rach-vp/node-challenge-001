const { NotFoundError } = require('objection');
const Author = require('../models/authors');

module.exports = {
  listAuthors: async (req, res) => {
    try {
      const authors = await Author.query();

      res.status(201).json(authors);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAuthorById: async (req, res) => {
    const { id } = req.params;

    try {
      const author = await Author.query().findById(id);
      if (!author) {
        throw new NotFoundError('Author');
      }

      res.status(201).json(author);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
