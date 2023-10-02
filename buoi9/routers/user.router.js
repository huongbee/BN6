const express = require('express');
const router = express.Router();
// const { User } = require('../model/User');
let { listUser } = require('../model/User');

router.get('/users', (req, res) => {
  res.render('list-user', { users: listUser });
});

router.get('/user/:id', (req, res) => {
  // const id = +req.params.id;
  const user = listUser.find(user => user.id == +req.params.id);
  res.render('detail-user', { user });
});
router.get('/delete/:id', (req, res) => {
  listUser = listUser.filter(user => user.id != +req.params.id);
  console.log(listUser);
  res.redirect('/users');
});

router.get('/update/:id', (req, res) => {
  const user = listUser.find(user => user.id == +req.params.id);
  res.render('update', { user });
});
router.post('/update', (req, res) => {
  const { idUser, username, fullname, password } = req.body;
  const user = listUser.find(user => user.id == idUser);
  user.fullname = fullname;
  user.password = password;
  user.username = username;
  res.redirect('/users');
});
module.exports = router;