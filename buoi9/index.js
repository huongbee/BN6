const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/users', (req, res) => {
  res.render('list-user');
});

app.listen(3000, () => { console.log('server running on port 3000'); });