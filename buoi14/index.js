const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/BN6-buoi14', { useMongoClient: true })
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message));

const ProductTypeModel = require('./models/ProductTypeModel');
const ProductModel = require('./models/ProductModel');


// select p.*, t.name as nametype,
// from products p inner join productypes t
// on t._id = p.idType
(async () => {
  let products = await ProductModel.find().populate('idType').exec();
  console.log(products[0].idType.name); // products[0].idType = producttypes[?]
  console.log(products[0].name);
})()