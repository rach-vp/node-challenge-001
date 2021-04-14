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
  .post(
    '/logout',
    [authentication.refresh, authentication.bearer],
    usersController.logout,
  );

router
  .get(
    '/users',
    authentication.bearer,
    usersController.listUsers,
  );

router
  .post(
    '/users/refresh-token',
    authentication.refresh,
    usersController.login,
  );

router
  .get(
    '/users/verify-email/:token',
    authentication.emailVerification,
    usersController.verifyEmail,
  );

module.exports = router;
