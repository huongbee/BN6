const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/BN6-buoi20')
  .then(() => console.log('DB Connected!'));