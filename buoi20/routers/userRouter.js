const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controller/UserController');
const { verifyUserLogin } = require('../helpers/authenticate'); //

router.post('/register', register);
router.post('/login', login);
router.post('/update-profile', verifyUserLogin, updateProfile);

module.exports = router;
