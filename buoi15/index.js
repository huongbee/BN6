const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');
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
// ProductModel.updateMany(
//   {
//     id: 5,
//     tags: 'Reno'// find  element = Reno in array tags
//   },
//   {
//     $set: {
//       'tags.$': 'Reno updated'
//     }
//   }
// )
//   .then(result => console.log(result))


// ProductModel.updateOne(
//   {
//     id: 5
//   },
//   {
//     $set: {
//       updated: [
//         {
//           date: moment(new Date()).subtract(10, 'days'),
//           promotionPercent: 10
//         },
//         {
//           date: moment(),
//           promotionPercent: 5
//         }
//       ]
//     }
//   }
// )
//   .then(result => console.log(result))


// ProductModel.updateOne(
//   {
//     id: 5,
//     'updated.promotionPercent': 5
//   },
//   {
//     $set: {
//       'updated.$.date': moment(new Date()).add(3, 'days')
//     }
//   }
// )
//   .then(result => console.log(result))
// ProductModel.updateOne(
//   {
//     id: 5,
//     'updated._id': '652e75ceac6cc10cd83deb30'
//   },
//   {
//     $inc: { 'updated.$.promotionPercent': 1 }
//   }
// )
//   .then(result => console.log(result))


// thêm phần tử mới vào field tags
// ProductModel.updateOne(
//   {
//     id: 5,
//   },
//   {
//     $push: { tags: 'Oppo' }
//   }
// ).then(result => console.log(result))

// ProductModel.updateOne(
//   {
//     id: 5,
//   },
//   {
//     $addToSet: { tags: 'Oppo 1' }
//   }
// ).then(result => console.log(result))

// xóa phần tử ở vị trí đầu trong field tags

// ProductModel.updateOne(
//   {
//     id: 5,
//   },
//   {
//     $pop: { tags: -1 }
//   }
// ).then(result => console.log(result))


// xóa phần tử ở vị trí cuối trong field tags

// ProductModel.updateOne(
//   {
//     id: 5,
//   },
//   {
//     $pop: { tags: 1 }
//   }
// ).then(result => console.log(result))



// ProductModel.updateOne(
//   {
//     id: 5 // where
//   },
//   {
//     $pull: { // xoa phan tu o vi tri tuong ung
//       'tags': 'ĐTDĐ' // where
//     }
//   }
// )
//   .then(result => console.log(result))




// ProductModel.findOneAndUpdate(
//   {
//     id: 5 // where
//   },
//   {
//     $pull: { // xoa phan tu o vi tri tuong ung
//       'tags': 'Phone'  // where
//     }
//   }
// ).lean()
//   .then(result => console.log(result))

// ProductModel.findOneAndUpdate(
//   {
//     id: 5 // where
//   },
//   {
//     $pull: { // xoa phan tu o vi tri tuong ung
//       'tags': 'Reno updated' // where
//     }
//   },
//   { new: true }
// ).lean()
//   .then(result => console.log(result))


// ProductModel.findOneAndUpdate(
//   {
//     id: 5, // where
//   },
//   {
//     $pop: { // xoa phan tu o vi tri cuoi mang
//       'updated': 1 // where
//     }
//   },
//   { new: true }
// ).lean()
//   .then(result => console.log(result))



// ProductModel.findOneAndRemove({
//   name: { $regex: /Samsung/ }
// }).lean()
//   .then(result => console.log(result))


// ProductModel.deleteOne({
//   name: { $regex: /Samsung/ }
// }).then(result => console.log(result.deletedCount))


// db.getCollection("products").find({"id" : 3})




// p = 1 => skip=0
// p = 2 => skip=10  = (p-1)*10
// .skip(0).limit(10)