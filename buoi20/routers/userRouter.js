const express = require('express');
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  forgetPasswordByEmail,
  verifyForgetPasswordByEmail,
  resetPassword
} = require('../controller/UserController');
const { verifyUserLogin } = require('../helpers/authenticate'); //

router.post('/register', register);
router.post('/login', login);
router.post('/update-profile', verifyUserLogin, updateProfile);

router.post('/forget-password', forgetPasswordByEmail);
router.get('/verify/*', verifyForgetPasswordByEmail);
// /verify/U2FsdGVkX1+zX8ZF93fx/bk0+q0dRdKpSHjOVqxehQ4kKLkxQrO/Gb/dYjGX6L7EY0uIi4vPMrkxdsjVqT4MV1kLHBuLMtPnIyV6CxSNzuI=
router.post('/reset-password', resetPassword);


module.exports = router;
