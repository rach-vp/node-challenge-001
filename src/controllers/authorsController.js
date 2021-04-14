const moment = require('moment');

const { NotFoundError } = require('../errors');
const Author = require('../models/authors');
const { AuthorSerializer } = require('../serializers');

module.exports = {
  listAuthors: async (req, res, next) => {
    try {
      const authors = await Author.query();
      const authorSerializer = new AuthorSerializer('json', ['id', 'created_at', 'updated_at']);

      res.status(201).send(authorSerializer.serialize(authors));
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

      const authorSerializer = new AuthorSerializer('json', ['id', 'email', 'created_at', 'updated_at']);

      res.status(201).send(authorSerializer.serialize(author));
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const data = req.body;

      await Author.query().insert(data);

      res.status(200).send();
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

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const author = await Author.query().findById(id);
      if (!author) {
        throw new NotFoundError('Author');
      }
      await Author.query().deleteById(id);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
