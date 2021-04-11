const router = require('express').Router();

const userAccess = require('./userAccess');

router.use(userAccess);

module.exports = router;
