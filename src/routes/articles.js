const router = require('express').Router();
const articlesController = require('../controllers/articlesController');
const { authentication } = require('../middlewares');

router.get(
  '/admin/articles',
  authentication.bearer,
  articlesController.listArticles,
);

router.get(
  '/admin/articles/:id',
  authentication.bearer,
  articlesController.getArticleById,
);

router.get(
  '/articles/',
  authentication.bearer,
  articlesController.getArticleByCategory,
);

router.post(
  '/admin/articles',
  authentication.bearer,
  articlesController.create,
);

router.put(
  '/admin/articles/:id',
  authentication.bearer,
  articlesController.update,
);

router.delete(
  '/admin/articles/:id',
  authentication.bearer,
  articlesController.delete,
);

module.exports = router;
