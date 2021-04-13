const Article = require('../models/articles');
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
    const { id } = req.params;

    try {
      const article = await Article.query().findById(id);

      if (!article) {
        throw new NotFoundError('Article');
      }

      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
