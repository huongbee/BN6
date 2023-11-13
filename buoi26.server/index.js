const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cors())
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.post('/', (req, res) => {
  const { txtMessage } = req.body;
  console.log(txtMessage);
  io.sockets.emit('message', txtMessage);
  res.redirect('/');
})
app.get('/', (req, res) => {
  res.render('index');
})

// app server
server.listen(3000, () => console.log('listening on port 3000'))

// Async: cb, promise, async/await
// Express:...
// MySQL, MongoDB
// Jwt, crypto-js, fs, redis, mailer
//