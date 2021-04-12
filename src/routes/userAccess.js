const passport = require('passport');

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
    passport.authenticate('local', { session: false }),
    usersController.login,
  );

module.exports = router;
