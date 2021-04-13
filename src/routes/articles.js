const router = require('express').Router();
const articlesController = require('../controllers/articlesController');

router.get(
  '/admin/articles',
  articlesController.listArticles,
);

router.get(
  '/admin/articles/:id',
  articlesController.getArticleById,
);

router.post(
  '/admin/articles',
  articlesController.create,
);

module.exports = router;
