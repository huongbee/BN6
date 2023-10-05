const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionConfig = require('./config/session');
const app = express();

app.use(cookieParser(''))
app.use(session(sessionConfig))
app.use(flash());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
// const fs = require('fs');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
app.use('/product', productRouter); // /product: prefix url
app.use('/', userRouter);
app.listen(3000, () => { console.log('server running on port 3000'); });
