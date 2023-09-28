/**
Dựng 1 server, tạo 3 routers với response:
- Đọc ds 3 users trong file users.json, http://localhost:3000/users

- Lấy 1 user theo id mà url gửi vào,vd: http://localhost:3000/user/1  -> GET

- Lấy thông tin của 1 user với input là json: { usermame, password }   -> POST
  (YC: Kiểm tra thông tin user ở function middleware)

 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users = require('./users.json');
app.use(bodyParser.json());

const authentication = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.send({
      error: true,
      message: 'User not found'
    })
  }
  req.body.user = user;
  next();
}
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
// app.use(authentication);
app
  .get('/login', (req, res) => {
    res.send("render html form login");
  })
  .post('/login', [authentication, myLogger], (req, res) => {
    // handle login
    const { user } = req.body;
    delete user.password;
    res.send(user);
  });

app.listen(3000);