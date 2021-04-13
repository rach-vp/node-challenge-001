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

router.get(
  '/articles/',
  articlesController.getArticleByCategory,
);

router.post(
  '/admin/articles',
  articlesController.create,
);

router.put(
  '/admin/articles/:id',
  articlesController.update,
);

router.delete(
  '/admin/articles/:id',
  articlesController.delete,
);

module.exports = router;
