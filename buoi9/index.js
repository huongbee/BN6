const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));
const users = require('./data/users.json');

app.get('/users', (req, res) => {
  res.render('list-user', { users });
});

app.get('/user/:id', (req, res) => {
  // const id = +req.params.id;
  const user = users.find(user => user.id == +req.params.id);
  res.render('detail-user', { user });
});

app.listen(3000, () => { console.log('server running on port 3000'); });