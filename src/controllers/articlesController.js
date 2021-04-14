const moment = require('moment');
const Article = require('../models/articles');
const Author = require('../models/authors');
const { NotFoundError } = require('../errors');
const { ArticleSerializer, AuthorSerializer } = require('../serializers');

module.exports = {
  listArticles: async (req, res, next) => {
    try {
      const articles = await Article.query();
      const serializer = new ArticleSerializer(
        'json',
        ['id', 'first_paragraph', 'body', 'author_id', 'created_at', 'updated_at'],
      );

      res.status(200).send(serializer.serialize(articles));
    } catch (error) {
      next(error);
    }
  },

  getArticleById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const article = await Article.query().findById(id);

      if (!article) {
        throw new NotFoundError('Article');
      }

      const authorSerializer = new AuthorSerializer('json');
      const author = await Author.query().findById(article.author_id);
      article.author = JSON.parse(authorSerializer.serialize(author));

      if (!req.authenticated) {
        const articleSerializer = new ArticleSerializer('json', ['first_paragraph']);
        res.status(200).send(articleSerializer.serialize(article));
      } else if (req.user.role !== 'admin') {
        const articleSerializer = new ArticleSerializer('json', ['first_paragraph', 'body']);
        res.status(200).send(articleSerializer.serialize(article));
      } else {
        const articleSerializer = new ArticleSerializer(
          'json',
          ['id', 'first_paragraph', 'body', 'author_id', 'created_at', 'updated_at'],
        );
        res.status(200).send(articleSerializer.serialize(article));
      }
    } catch (error) {
      next(error);
    }
  },

  getArticleByCategory: async (req, res, next) => {
    try {
      const { category: categoryRaw } = req.query;
      const categoryFormated = categoryRaw.split('+').join(' ');

      const articles = await Article.query().where('category', categoryFormated);

      if (!articles) {
        throw new NotFoundError('Article');
      }

      const articleSerializer = new ArticleSerializer('json');
      const authorSerializer = new AuthorSerializer('json');

      const tempArticles = await Promise.all(articles.map(async (article) => {
        const author = await Author.query().findById(article.author_id);
        return { ...article, author: JSON.parse(authorSerializer.serialize(author)) };
      }));

      res.status(200).send(articleSerializer.serialize(tempArticles));
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const data = req.body;

      await Article.query().insert(data);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedArticle = await Article.query().patchAndFetchById(
        id,
        { ...data, updated_at: moment() },
      );
      if (!updatedArticle) {
        throw new NotFoundError('Article');
      }

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const article = await Article.query().deleteById(id);
      if (!article) {
        throw new NotFoundError('Article');
      }

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
