const mongoose = require('mongoose');
const md5 = require('md5');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/BN6-baitap', { useMongoClient: true })
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message));
const UserModel = require('./models/User');
const CommentModel = require('./models/Comment');
const PostModel = require('./models/Post');

(async () => {
  //  5 Dùng tài khoản manager@gmail.com dislike bài post có id 6531304a8208ea3147485b0d
  const user = await UserModel.findOne({ email: 'manager@gmail.com' }).lean();
  const data = await PostModel.updateOne(
    {
      _id: '6531304a8208ea3147485b0d', // where
    },
    {
      $pull: {
        likes: user._id // where
      }
    },
    { new: true }
  );
  console.log(data);


  //4 Dùng tài khoản manager@gmail.com like bài post có id 6531304a8208ea3147485b0d
  // const user = await UserModel.findOne({ email: 'manager@gmail.com' }).lean();

  // const data = await PostModel.updateOne(
  //   { _id: '6531304a8208ea3147485b0d' },
  //   {
  //     $addToSet: { likes: user._id }
  //   },
  //   { new: true }
  // );
  // console.log(data);



  //3
  // find user manager@gmail.com
  // const postAuthor = await UserModel.findOne({ email: 'manager@gmail.com' }).lean();
  // if (!postAuthor) {
  //   console.log('Can\'t find user');
  //   return;
  // }
  // // find post của postAuthor
  // const post = await PostModel.findOne({ author: postAuthor._id }).lean();

  // // find user A insert comment on post
  // const userA = await UserModel.findOne({ email: 'Admin@gmail.com' }).lean();

  // // user A insert comment
  // const data = await CommentModel.create({
  //   content: userA.name + ' đã comment trên bài post của ' + postAuthor.name,
  //   author: userA._id,
  //   post: post._id
  // })





  // 2
  // find user manager@gmail.com
  // const user = await UserModel.findOne({ email: 'user@gmail.com' }).lean();
  // if (!user) {
  //   console.log('Can\'t find user');
  //   return;
  // }
  // const data = await PostModel.insertMany([
  //   {
  //     content: 'bài post số 1 của user@gmail.com',
  //     author: user._id
  //   },
  //   {
  //     content: 'bài post số 2 của user@gmail.com',
  //     author: user._id
  //   }
  // ]);


  // 1
  // const users = await UserModel.insertMany([
  //   {
  //     email: 'manager@gmail.com',
  //     password: md5('111111'),
  //     name: 'Manager'
  //   },
  //   {
  //     email: 'guest@gmail.com',
  //     password: md5('111111'),
  //     name: 'Guest'
  //   },
  //   {
  //     email: 'Admin@gmail.com',
  //     password: md5('111111'),
  //     name: 'Admin'
  //   },
  //   {
  //     email: 'user@gmail.com',
  //     password: md5('111111'),
  //     name: 'User'
  //   },
  //   {
  //     email: 'hacker@gmail.com',
  //     password: md5('111111'),
  //     name: 'Hacker'
  //   }
  // ]);
  // console.log(users);

})()