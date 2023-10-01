const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));
const fs = require('fs');

app.get('/users', (req, res) => {
  const users = require('./data/users.json');
  res.render('list-user', { users });
});

app.get('/user/:id', (req, res) => {
  // const id = +req.params.id;
  const users = require('./data/users.json');
  const user = users.find(user => user.id == +req.params.id);
  res.render('detail-user', { user });
});
app.get('/delete/:id', (req, res) => {
  const users = require('./data/users.json');
  const newUsers = users.filter(user => user.id != +req.params.id);
  fs.writeFileSync('./data/users.json', JSON.stringify(newUsers));
  res.redirect('/users');
});

app.listen(3000, () => { console.log('server running on port 3000'); });