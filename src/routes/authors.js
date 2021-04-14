const router = require('express').Router();
const authorsController = require('../controllers/authorsController');
const { authentication, authorization } = require('../middlewares');

router.get(
  '/admin/authors',
  [authentication.bearer, authorization('author', 'read')],
  authorsController.listAuthors,
);

router.get(
  '/admin/authors/:id',
  [authentication.bearer, authorization('author', 'read')],
  authorsController.getAuthorById,
);

router.post(
  '/admin/authors',
  [authentication.bearer, authorization('author', 'create')],
  authorsController.create,
);

router.put(
  '/admin/authors/:id',
  [authentication.bearer, authorization('author', 'update')],
  authorsController.update,
);

router.delete(
  '/admin/authors/:id',
  [authentication.bearer, authorization('author', 'delete')],
  authorsController.delete,
);

module.exports = router;
