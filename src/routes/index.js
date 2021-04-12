const router = require('express').Router();

const userAccess = require('./userAccess');
const authors = require('./authors');

router.use(userAccess);
router.use(authors);

module.exports = router;
