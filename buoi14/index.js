const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/BN6-buoi14', { useMongoClient: true })
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message));

const ProductTypeModel = require('./models/ProductTypeModel');
const ProductModel = require('./models/ProductModel');



(async () => {

  // select p.*, t.* as nametype,
  // from products p inner join productypes t
  // on t._id = p.idType
  // const products = await ProductModel.find().lean().populate('idType').exec();
  // console.log(products[0].idType.name); // products[0].idType = producttypes[?]
  // console.log(products[0].name);


  // select p.name, p.price, t.name, t.createdAt,
  // from products p inner join productypes t
  // on t._id = p.idType

  // const products = await ProductModel.find()
  //   .select('name price -_id')
  //   .lean()
  //   .populate({
  //     path: 'idType',
  //     select: 'name createdAt -_id',
  //     match: { name: 'Samsung1' } //
  //   })
  //   .exec();

  // select p.name, p.price, t.name, t.createdAt
  // from products p left join (
  //      select * from productypes
  //      where name = 'Samsung'
  //) t
  // on t._id = p.idType

  const products = await ProductModel.find()
    .select('name price -_id')
    .lean()
    .populate({
      path: 'idType',
      select: 'name createdAt -_id',
      match: { name: 'Samsung' },
      sort: 'desc'
    })
    .exec();

  console.log(products[0]);



})();
