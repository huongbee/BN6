const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const cors = require('cors')
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cors())


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('message', 'gui message den client')
});


// app server
app.listen(3000, () => console.log('listening on port 3000'))