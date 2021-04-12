const router = require('express').Router();
const authorsController = require('../controllers/authorsController');

router.get(
  '/admin/authors',
  authorsController.listAuthors,
);

router.get(
  '/admin/authors/:id',
  (req, res) => res.status(200).json({ message: 'Get author by id' }),
);

router.post(
  '/admin/authors',
  (req, res) => res.status(200).json({ message: 'Create a new author' }),
);

router.put(
  '/admin/authors/:id',
  (req, res) => res.status(200).json({ message: 'Update author info' }),
);

router.delete(
  '/admin/authors/:id',
  (req, res) => res.status(200).json({ message: 'Delete an author' }),
);

module.exports = router;
