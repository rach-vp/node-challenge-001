const router = require('express').Router();

const userAccess = require('./userAccess');
const authors = require('./authors');
const articles = require('./articles');

router.use(userAccess);
router.use(authors);
router.use(articles);

module.exports = router;
