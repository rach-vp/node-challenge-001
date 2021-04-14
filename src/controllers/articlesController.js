const moment = require('moment');
const Article = require('../models/articles');
const Author = require('../models/authors');
const { NotFoundError } = require('../errors');

module.exports = {
  listArticles: async (req, res, next) => {
    try {
      const articles = await Article.query();

      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  },

  getArticleById: async (req, res, next) => {
    try {
      const { id } = req.params;
      let formatedArticleObj;

      const article = await Article.query().findById(id);

      if (!article) {
        throw new NotFoundError('Article');
      }

      const { name, picture } = await Author.query().findById(article.author_id);

      if (!req.authenticated) {
        const {
          category, title, summary, first_paragraph: firstParagraph,
        } = article;
        formatedArticleObj = {
          author: { name, picture },
          category,
          title,
          summary,
          firstParagraph,
        };
      } else if (req.user.role !== 'admin') {
        const {
          category, title, summary, first_paragraph: firstParagraph, body,
        } = article;
        formatedArticleObj = {
          author: { name, picture },
          category,
          title,
          summary,
          firstParagraph,
          body,
        };
      }

      res.status(200).json(formatedArticleObj || article);
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

      const formatedArrayArticles = await Promise.all(
        articles.map(async ({
          category, title, summary, author_id: authorId,
        }) => {
          const { name, picture } = await Author.query().findById(authorId);
          return {
            author: { name, picture },
            category,
            title,
            summary,
          };
        }),
      );

      res.status(200).json(formatedArrayArticles);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const data = req.body;

      const { id, title } = await Article.query().insert(data);

      res.status(200).json({
        message: 'Article successfully created',
        article: { id, title },
      });
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

      res.status(201).json(updatedArticle);
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

      res.status(200).json({
        message: 'Article successfully deleted',
      });
    } catch (error) {
      next(error);
    }
  },
};
