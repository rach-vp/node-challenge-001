const router = require('express').Router();
const authorsController = require('../controllers/authorsController');

router.get(
  '/admin/authors',
  authorsController.listAuthors,
);

router.get(
  '/admin/authors/:id',
  authorsController.getAuthorById,
);

router.post(
  '/admin/authors',
  authorsController.create,
);

router.put(
  '/admin/authors/:id',
  authorsController.update,
);

router.delete(
  '/admin/authors/:id',
  authorsController.delete,
);

module.exports = router;
