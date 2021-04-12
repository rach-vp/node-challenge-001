const router = require('express').Router();
const usersController = require('../controllers/usersController');

router
  .post(
    '/sign-up',
    usersController.createUser,
  );

router
  .post(
    '/login',
    (req, res) => res.status(200).send({ message: 'this is the login route' }),
  );

module.exports = router;
