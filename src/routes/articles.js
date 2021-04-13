const passport = require('passport');
const router = require('express').Router();
const articlesController = require('../controllers/articlesController');

router.get(
  '/admin/articles',
  passport.authenticate('bearer', { session: false }),
  articlesController.listArticles,
);

router.get(
  '/admin/articles/:id',
  passport.authenticate('bearer', { session: false }),
  articlesController.getArticleById,
);

router.get(
  '/articles/',
  passport.authenticate('bearer', { session: false }),
  articlesController.getArticleByCategory,
);

router.post(
  '/admin/articles',
  passport.authenticate('bearer', { session: false }),
  articlesController.create,
);

router.put(
  '/admin/articles/:id',
  passport.authenticate('bearer', { session: false }),
  articlesController.update,
);

router.delete(
  '/admin/articles/:id',
  passport.authenticate('bearer', { session: false }),
  articlesController.delete,
);

module.exports = router;
