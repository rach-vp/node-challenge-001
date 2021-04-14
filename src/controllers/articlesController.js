const moment = require('moment');
const Article = require('../models/articles');
const Author = require('../models/authors');
const { NotFoundError } = require('../errors');

module.exports = {
  listArticles: async (req, res) => {
    try {
      const articles = await Article.query();

      res.status(200).json(articles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const { id } = req.params;
      // const { role } = req.user;
      const role = 'subscriber';
      let formatedArticleObj;

      const article = await Article.query().findById(id);
      const { name, picture } = await Author.query().findById(article.author_id);

      if (!article) {
        throw new NotFoundError('Article');
      }

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
      } else if (role !== 'admin') {
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

      res.status(200).json(formatedArticleObj);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getArticleByCategory: async (req, res) => {
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
      res.status(400).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const {
        title,
        category,
        summary,
        first_paragraph: firstParagraph,
        body,
        Article_id: ArticleId,
      } = req.body;

      const article = await Article.query().insert({
        title,
        category,
        summary,
        first_paragraph: firstParagraph,
        body,
        Article_id: ArticleId,
      });

      res.status(200).json({
        message: 'Article successfully created',
        article: {
          id: article.id, title, ArticleId,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
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
      if (error.name === 'ForeignKeyViolationError') {
        res.status(404).json({ error: 'Authors ID not found' });
      }
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
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
      res.status(400).json({ error: error.message });
    }
  },
};
