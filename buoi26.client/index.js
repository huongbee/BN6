const express = require('express');
const app = express();
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index');
})

// app client
app.listen(8080, () => console.log('listening on port 8080'))