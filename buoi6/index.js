const express = require('express');
const bodyParser = require('body-parser'); // init
const app = express();

app.use(bodyParser.json({})); // use

app.get('/', (request, response) => {
  response.send("Hello World")
})

app.post('/', (request, response) => {
  // console.log(request.body);
  // const { username, password } = request.body;
  const username = request.body.username;
  console.log(username, password);
  response.send("Hello POST");
})

app.listen(3000, () => {
  console.log('listening on port 3000');
})

let obj = { n: 3, m: 4, a: 5, b: 6, c: null };
({ n, m, ...rest } = obj)
console.log(n, m, rest);
