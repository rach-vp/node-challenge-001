const router = require('express').Router();

router.get('/login', (req, res) => res.status(200).send({ message: 'this is the login route' }));

router.get('/sign-up', (req, res) => res.status(200).send({ message: 'this is the sign-up route' }));

module.exports = router;
