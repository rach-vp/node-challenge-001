const router = require('express').Router();
const authorsController = require('../controllers/authorsController');
const { authentication } = require('../middlewares');

router.get(
  '/admin/authors',
  authentication.bearer,
  authorsController.listAuthors,
);

router.get(
  '/admin/authors/:id',
  authentication.bearer,
  authorsController.getAuthorById,
);

router.post(
  '/admin/authors',
  authentication.bearer,
  authorsController.create,
);

router.put(
  '/admin/authors/:id',
  authentication.bearer,
  authorsController.update,
);

router.delete(
  '/admin/authors/:id',
  authentication.bearer,
  authorsController.delete,
);

module.exports = router;
