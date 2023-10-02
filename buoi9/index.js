const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));
const fs = require('fs');
const { User } = require('./model/User');
let { listUser } = require('./model/User'); //

app.get('/users', (req, res) => {
  res.render('list-user', { users: listUser });
});

app.get('/user/:id', (req, res) => {
  // const id = +req.params.id;
  const user = listUser.find(user => user.id == +req.params.id);
  res.render('detail-user', { user });
});
app.get('/delete/:id', (req, res) => {
  listUser = listUser.filter(user => user.id != +req.params.id);
  console.log(listUser);
  res.redirect('/users');
});

app.get('/update/:id', (req, res) => {
  const user = listUser.find(user => user.id == +req.params.id);
  res.render('update', { user });
});
app.listen(3000, () => { console.log('server running on port 3000'); });