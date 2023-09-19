const express = require('express');
const users = require('./users.json'); // sync
// const userTxt = require('./users.txt'); // async

// console.log(typeof userTxt);




const app = express();

app.get('/', (request, response) => {  // dinh nghia 1 route /
  // response.send("Hello World!")
  response.send({ text: 'Hello World' })
  // response.json({ text: 'Hello World' })
});

app.get('/users', (request, response) => {
  response.send(users);
});
app.get('/users/:id', (request, response) => {
  // const id = request.params.id;
  const { id } = request.params;
  response.send(id);
});
app.listen(3000);


/**
https://expressjs.com/en/guide/routing.html


Bai 1:
Dựng 1 server node
Tạo 1 router có path
http://localhost:3000/cong/1/2
http://localhost:3000/tru/1/2
http://localhost:3000/nhan/1/2
http://localhost:3000/chia/1/2

response json { a: 1, b: 2, pheptinh: 'cong', ketqua: 3 }


Bai 2:
tinh phep tinh sau bang API đã tạo ở bài 1 (((3+5) + (2+4))*6)/2

 */