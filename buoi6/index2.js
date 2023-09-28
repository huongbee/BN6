const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  const remoteAddress = req.socket.remoteAddress; //req IP

  if (remoteAddress != '::1') {
    next()
  } else
    res.json({
      resCode: 404,
      error: true,
      message: 'Not found user'
    })
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)