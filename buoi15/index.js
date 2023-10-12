const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/BN6-buoi14', { useMongoClient: true })
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message));

const ProductTypeModel = require('./models/ProductTypeModel');
const ProductModel = require('./models/ProductModel');



// // update products set price = 5500000 where id = 5 or id = 5;
// ProductModel.update( // == updateOne
//   {
//     $or: [{ id: 5 }, { id: 4 }]
//   },
//   {
//     price: 5500000,
//   })
//   .then(result => console.log(result))

// ProductModel.updateOne(
//   {
//     $or: [{ id: 5 }, { id: 4 }]
//   },
//   {
//     price: 5500000,
//   })
//   .then(result => console.log(result))


// ProductModel.updateMany(
//   {
//     $or: [{ id: 5 }, { id: 4 }]
//   },
//   {
//     price: 5500000,
//   })
//   .then(result => console.log(result))

// update 1 phần tử ở vị trí x bên trong field tags của sp có id = 5
ProductModel.updateMany(
  {
    id: 5,
    tags: 'Reno'// find  element = Reno in array tags
  },
  {
    $set: {
      'tags.$': 'Reno updated'
    }
  }
)
  .then(result => console.log(result))



// thêm phần tử mới vào field tags

// xóa phần tử ở vị trí đầu trong field tags

// xóa phần tử ở vị trí cuối trong field tags