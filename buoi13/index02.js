const mongoose = require('mongoose');

// connection string: mongodb://localhost:27017/BN6-buoi13
// BN6-buoi13: BD name
mongoose.connect('mongodb://127.0.0.1:27017/BN6-buoi13')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message));


const Schema = mongoose.Schema;

// define User collection
const UserSchema = new Schema({
  fullname: {
    type: String,
    max: 100
  },
  age: Number,
  username: {
    type: String,
    max: 100,
    required: true,
    unique: true
  },
  password: String,
  birthdate: Date,
});
const UserModel = mongoose.model('User', UserSchema); // User: collection name

// insert
// const user = new UserModel();
// user.fullname = 'Nguyễn Văn D';
// user.age = 30;
// user.username = 'nguyenvand';
// user.password = '';
// user.birthdate = new Date();
// // user.createdAt = new Date();
// user.save()
//   .then(usr => console.log(usr))
//   .catch((err) => console.log(err.message));


// insert many
// UserModel.insertMany([
//   {
//     fullname: 'Trần Văn B',
//     age: 30,
//     username: 'tranvanb',
//     password: '',
//     birthdate: new Date(),
//   },
//   {
//     age: 20,
//     username: 'tranvanc',
//     password: '',
//     birthdate: new Date(),
//   },
//   {
//     fullname: 'Nguyễn Thị Thanh',
//     age: 25,
//     username: 'nguyenthithanh',
//     password: '',
//     birthdate: new Date(),
//   },
//   {
//     fullname: 'Lê Thanh Thanh',
//     age: 27,
//     username: 'lethanhthanh',
//     password: '',
//   },
//   {
//     fullname: 'Lê Văn A',
//     age: 10,
//     username: 'levana',
//     password: '',
//     birthdate: new Date(),
//   }
// ])



// 1
// {
//     "_id": ObjectId("6523f457c8b5b26a138e369f"),
//     "fullname": "Nguyễn Văn A",
//     "age": NumberInt("10"),
//     "username": "nguyenvana",
//     "password": "",
//     "birthdate": ISODate("2023-10-09T12:38:47.838Z"),
//     "__v": NumberInt("0")
// }


// select
// select * from users
// UserModel.find()
//   .then(users => console.log(users))
//   .catch((err) => console.log(err.message));

// select * from users where username = 'nguyenvanb' and age = 10;
// UserModel.findOne({
//   username: 'nguyenvanb',
//   age: 10
// })
//   .then(user => console.log(user))
//   .catch((err) => console.log(err.message));



// select * from users where username = 'nguyenvanb' or username = 'nguyenvana' and  age= 30;
// UserModel.find({
//   $or: [{ username: 'nguyenvana' }, { username: 'nguyenvand' }],
//   age: 30
// })
//   .then(user => console.log(user))
//   .catch((err) => console.log(err.message));

// UserModel.findById({ _id: '6523f7fa5214a7e13b741b73' })
//   .then(user => console.log(user))
//   .catch((err) => console.log(err.message));

// select * from users where age >= 20;
// gte: greater than or equal: >=
// gt: greater than: >
// lte: less than or equal: <=
// lt: less than: <

// UserModel.find({
//   age: { $gte: 20 },
// })
//   .then(user => console.log(user))
//   .catch((err) => console.log(err.message));



// select * from users where fullname like 'Nguyễn%';
// UserModel.find({
//   fullname: { $regex: /^Nguyễn/ },
// })
//   .then(user => console.log(user))
//   .catch((err) => console.log(err.message));

// select * from users where fullname like '%Nguyễn';
// UserModel.find({
//   fullname: { $regex: /Nguyễn$/ },
// })
//   .then(user => console.log(user))
//   .catch((err) => console.log(err.message));

// select fullname, age from users where fullname like '%Nguyễn%';
// UserModel.find({
//   fullname: { $regex: /Nguyễn/ },
// }).select('fullname age -_id')
//   // .sort({ fullname: 'desc' })
//   .sort('-fullname')
//   .then(user => console.log(user))
//   .catch((err) => console.log(err.message));


// select fullname, username from users;
//$match

// select 10+15 as example
// from users
// UserModel.aggregate([
//   {
//     $match: {}
//   },

//   {
//     $project: {
//       _id: 0, // hide _id
//       example: { $sum: 10 + 15 }
//     }
//   }
// ])
//   .then(result => console.log(result))

// select count(*) as total, age
// from users
// where age <= 10
// group by age
// having total >= 2
// order by total desc
UserModel.aggregate([
  {
    $match: {}
    // $match: { age: { $lte: 10 } }
  },
  {
    $group: {
      _id: '$age',
      // total: { $sum: 1 }
      total: { $count: {} }
    }
  },
  {
    $match: { total: { $gte: 2 } }
  },
  {
    $project: {
      age: '$_id', // rename _id
      _id: 0, // hide _id
      total: 1
    }
  },
  {
    $sort: { total: -1 }
  }
])
  .then(result => console.log(result))