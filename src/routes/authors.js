const passport = require('passport');

const router = require('express').Router();
const authorsController = require('../controllers/authorsController');

router.get(
  '/admin/authors',
  passport.authenticate('bearer', { session: false }),
  authorsController.listAuthors,
);

router.get(
  '/admin/authors/:id',
  passport.authenticate('bearer', { session: false }),
  authorsController.getAuthorById,
);

router.post(
  '/admin/authors',
  passport.authenticate('bearer', { session: false }),
  authorsController.create,
);

router.put(
  '/admin/authors/:id',
  passport.authenticate('bearer', { session: false }),
  authorsController.update,
);

router.delete(
  '/admin/authors/:id',
  passport.authenticate('bearer', { session: false }),
  authorsController.delete,
);

module.exports = router;
