const express = require('express');
const router = express.Router();
const { findAllUsers, updateUser, findUserById } = require('../model/User');

router.get('/users', async (req, res) => {
  const users = await findAllUsers();
  // console.log(users);
  res.render('list-user', { users });
});

// router.get('/user/:id', (req, res) => {
//   // const id = +req.params.id;
//   const user = listUser.find(user => user.id == +req.params.id);
//   res.render('detail-user', { user });
// });
// router.get('/delete/:id', (req, res) => {
//   listUser = listUser.filter(user => user.id != +req.params.id);
//   console.log(listUser);
//   res.redirect('/users');
// });

router.get('/update/:id', async (req, res) => {
  const user = await findUserById(+req.params.id);
  if (!user) return res.redirect('/users');
  res.render('update', { user });
});
router.post('/update', async (req, res) => {
  const { idUser, username, fullname, password } = req.body;
  const result = await updateUser(idUser, fullname, username, password);
  if (!result) return res.redirect('/update/' + idUser);
  res.redirect('/users');
});
module.exports = router;