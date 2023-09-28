const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// const readline = require('readline');

// fs.readFile('./users.tx', 'utf-8', (error, content) => {
//   if (error) {
//     console.log('Error here');
//     console.log(error.message);
//   }
//   else console.log(content);
// });
const usersFile = fs.readFileSync('./users.txt', 'utf-8');
let arrayUsers = usersFile.split('\n');
arrayUsers = arrayUsers.map((userInfor) => {
  const user = userInfor.split('|');
  const u = {
    id: user[0],
    username: user[1],
    password: user[2],
    fullname: user[3]
  };
  return u;
})

app.get('/users', (req, res) => {
  res.json(arrayUsers);
});
app.post('/users', (req, res) => {
  const { user } = req.body;
  // ghi vao file
  const data = Object.values(user).join('|');
  // fs.writeFileSync('./users.txt', data); // overwrite
  fs.appendFileSync('./users.txt', '\n' + data); // add last
  res.json({
    error: false,
    message: 'Add user success',
    data: user
  })
});
// BTVN
app.get('/user/:id', (req, res) => {

});
// PUT update /user/:id  {fullname, password}
app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const { fullname, password } = req.body;
  console.log(id, password, fullname);
  // xu ly update user
  res.json({
    error: false,
    message: 'Update user success'
  })
});

// DELETE delete /user/:id
app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  // xu ly update user
  res.json({
    error: false,
    message: 'Delete user success'
  })
});
app.listen(3000);