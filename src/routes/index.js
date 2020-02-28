const { Router } = require('express');
const router = Router();
const ctr =  require('../controllers/index.controller');
const autorizado = require('../controllers/tokenAuth');


router.get('/me', autorizado, ctr.me);

router.get('/users', autorizado, ctr.getUsers);

router.post('/signin', ctr.signin);

router.post('/signup', ctr.signup);

module.exports = router;