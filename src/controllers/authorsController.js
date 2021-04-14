const moment = require('moment');

const { NotFoundError } = require('../errors');
const Author = require('../models/authors');

module.exports = {
  listAuthors: async (req, res, next) => {
    try {
      const authors = await Author.query();

      res.status(201).json(authors);
    } catch (error) {
      next(error);
    }
  },

  getAuthorById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const author = await Author.query().findById(id);
      if (!author) {
        throw new NotFoundError('Author');
      }

      res.status(201).json(author);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, email, picture } = req.body;

      const author = await Author.query().insert({
        name,
        email,
        picture,
      });

      res.status(200).json({
        message: 'Author successfully created',
        author: { id: author.id, name, picture },
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedAuthor = await Author.query().patchAndFetchById(
        id,
        { ...data, updated_at: moment() },
      );
      if (!updatedAuthor) {
        throw new NotFoundError('Author');
      }

      res.status(201).json(updatedAuthor);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const author = await Author.query().deleteById(id);
      if (!author) {
        throw new NotFoundError('Author');
      }

      res.status(200).json({
        message: 'Author successfully deleted',
      });
    } catch (error) {
      next(error);
    }
  },
};
