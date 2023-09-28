const express = require('express');
const app = express();
app.set('view engine', 'ejs');


const users = [
  {
    id: 1,
    email: 'admin@gmail.com'
  }
];
app.get('/', (req, res) => {
  res.render('home', {
    name: ' BN6',
    address: 'at Kmin',
    users
  })
})
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Liên hệ'
  })
})
app.get('/login', (req, res) => {
  res.render('login', {
  })
})

app.listen(3000);


//https://expressjs.com/en/guide/using-template-engines.html
//Pug, Mustache, EJS, Jade, handlebars
//https://www.npmjs.com/package/ejs