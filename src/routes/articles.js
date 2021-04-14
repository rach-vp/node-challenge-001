const router = require('express').Router();
const articlesController = require('../controllers/articlesController');
const {
  authentication,
  authorization,
  authenticationAttempt,
  authorizationAttempt,
} = require('../middlewares');

router.get(
  '/admin/articles',
  [authentication.bearer, authorization('article', 'read')],
  articlesController.listArticles,
);

router.get(
  '/admin/articles/:id',
  [authentication.bearer, authorization('article', 'read')],
  articlesController.getArticleById,
);

router.get(
  '/articles/:id',
  [authenticationAttempt, authorizationAttempt('article', 'read')],
  articlesController.getArticleById,
);

router.get(
  '/articles/',
  [authentication.bearer, authorization('article', 'read')],
  articlesController.getArticleByCategory,
);

router.post(
  '/admin/articles',
  [authentication.bearer, authorization('article', 'create')],
  articlesController.create,
);

router.put(
  '/admin/articles/:id',
  [authentication.bearer, authorization('article', 'update')],
  articlesController.update,
);

router.delete(
  '/admin/articles/:id',
  [authentication.bearer, authorization('article', 'delete')],
  articlesController.delete,
);

module.exports = router;
