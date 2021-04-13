const router = require('express').Router();
const usersController = require('../controllers/usersController');
const { authentication } = require('../middlewares');

router
  .post(
    '/sign-up',
    usersController.createUser,
  );

router
  .post(
    '/login',
    authentication.local,
    usersController.login,
  );

router
  .get(
    '/logout',
    authentication.bearer,
    usersController.logout,
  );

router
  .get(
    '/users',
    authentication.bearer,
    usersController.listUsers,
  );

module.exports = router;
