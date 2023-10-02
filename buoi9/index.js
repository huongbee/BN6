const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
const fs = require('fs');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
app.use('/product', productRouter); // /product: prefix url
app.use('/', userRouter);
app.listen(3000, () => { console.log('server running on port 3000'); });
