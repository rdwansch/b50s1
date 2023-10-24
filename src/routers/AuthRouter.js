const express = require('express');
const { LoginPage, RegisterPage, PostLogin, PostRegister, Logout } = require('../controllers/AuthController');

const router = express.Router();

router.get('/login', LoginPage);
router.post('/login', PostLogin);

router.get('/register', RegisterPage);
router.post('/register', PostRegister);

router.get('/logout', Logout);

module.exports = router;
