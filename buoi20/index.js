const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./configs/common_constants');
require('./configs/dbconnect');
const userRouter = require('./routers/userRouter.js');
const app = express();
app.use(bodyParser.json());
app.use('/', userRouter);
app.listen(PORT, () => { console.log('Server start on port ' + PORT); });