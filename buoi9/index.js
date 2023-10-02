const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
const fs = require('fs');
const { User } = require('./model/User');
let { listUser } = require('./model/User');

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
app.post('/update', (req, res) => {
  const { idUser, username, fullname, password } = req.body;
  const user = listUser.find(user => user.id == idUser);
  user.fullname = fullname;
  user.password = password;
  user.username = username;
  res.redirect('/users');
});
app.listen(3000, () => { console.log('server running on port 3000'); });


// http://localhost:3000/update?username=sale&password=111111&fullname=Sale+01