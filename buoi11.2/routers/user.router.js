const express = require('express');
const router = express.Router();
const { homePage, getViewUpdate, postUpdate, deleteUser, getUser } = require('../controller/UserController');
router.get('/users', homePage);
// router.get('/user/:id', getUser);
router.get('/delete/:id', deleteUser);
router.get('/update/:id', getViewUpdate);
router.post('/update', postUpdate);
module.exports = router;