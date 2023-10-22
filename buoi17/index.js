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
  // 15 Xoá bài đăng có ít hơn 5 lượt like
  // find bài đăng có ít hơn 5 lượt like
  const posts = await PostModel.aggregate([
    {
      $project: {
        count: { $size: '$likes' }
      }
    },
    { $match: { count: { $lte: 5 } } }
  ]);
  console.log(posts);

  // delete
  await PostModel.deleteMany({
    _id: posts.map(post => post._id)
  });

  // cho biet date ABC co nhung patients tham gia appointments
  // Appointments.aggregate([{
  //         $group: {
  //             _id: '$date',
  //             patients: {
  //                 $push: '$patient'
  //             }
  //         }
  //     },
  //     {
  //         $project: {
  //             date: '$_id',
  //             patients: 1,
  //             _id: 0
  //         }
  //     },
  //     {
  //         $lookup: {
  //             from: "patients", // collection patients
  //             localField: "patient", // field name in collection appointments
  //             foreignField: "_id", // _id in collection patients
  //             as: "patient_doc"
  //         }
  //     }
  // ])


  // 13 Cho biết comment đầu tiên trên bài post có id 65348ea4b35387176bd0171c của user admin@gmail.com có bao nhiêu lượt like
  // const data = await UserModel.findOne({ email: 'Admin@gmail.com' }).lean()
  //   .populate({
  //     path: 'posts',
  //     match: { _id: '65348ea4b35387176bd0171c' },
  //     populate: {
  //       path: 'comments',
  //       options: {
  //         limit: 1,
  //         skip: 0,
  //       }
  //     }
  //   });
  // console.log(data.posts[0].comments[0].likes.length);




  // 12 Cho biết bài đăng với id 65348ea4b35387176bd0171c có bao nhiêu lượt like, cho biết tên người tạo, liệt kê các comment của bài đăng đó, cho biết tên của user đã comment
  // const postInfo = await PostModel.findOne({ _id: '65348ea4b35387176bd0171c' })
  //   .lean()
  //   .populate({
  //     path: 'author',
  //     select: 'name -_id'
  //   })
  //   .populate({
  //     path: 'comments',
  //     populate: {
  //       path: 'author',
  //       select: 'name -_id'
  //     }
  //   })
  // console.log(`So luot like = ${postInfo.likes.length}`);
  // console.log(`Ten nguoi tao: ${postInfo.author.name}`);
  // postInfo.comments.forEach(comment => {
  //   console.log(`${comment.author.name} da viet comment voi noi dung: ${comment.content}`);
  // })


  //9
  // const data = await UserModel.findOne({ email: 'Admin@gmail.com' })
  //   .lean()
  //   .select('name -_id')
  //   .populate({
  //     path: 'posts',
  //     select: 'content -_id'
  //   })

  // console.log(data);

  // 8
  // tu lam
  // 7
  // const sender = await UserModel.findOne({ email: 'manager@gmail.com' }).lean();
  // const receiver = await UserModel.findOne({ email: 'guest@gmail.com' }).lean();
  // // update nguoi nhan
  // await UserModel.updateOne(
  //   { _id: receiver._id },
  //   {
  //     $addToSet: { friends: sender._id },
  //     $pull: { receiveRequests: sender._id }
  //   }
  // );
  // //update nguoi gui
  // await UserModel.updateOne(
  //   { _id: sender._id },
  //   {
  //     $addToSet: { friends: receiver._id },
  //     $pull: { sendRequests: receiver._id }
  //   }
  // );



  // 6
  // const sender = await UserModel.findOne({ email: 'manager@gmail.com' }).lean();
  // const receiver = await UserModel.findOne({ email: 'guest@gmail.com' }).lean();
  // await UserModel.updateOne(
  //   { _id: sender._id },
  //   {
  //     $set: {
  //       sendRequests: [...sender.sendRequests, receiver._id]
  //     }
  //   }
  // );
  // await UserModel.updateOne(
  //   { _id: receiver._id },
  //   {
  //     $addToSet: {
  //       receiveRequests: sender._id
  //     }
  //   }
  // );




  //  5 Dùng tài khoản manager@gmail.com dislike bài post có id 6531304a8208ea3147485b0d
  // const user = await UserModel.findOne({ email: 'manager@gmail.com' }).lean();
  // const data = await PostModel.updateOne(
  //   {
  //     _id: '6531304a8208ea3147485b0d', // where
  //   },
  //   {
  //     $pull: {
  //       likes: user._id // where
  //     }
  //   },
  //   { new: true }
  // );
  // console.log(data);


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
  // // find user manager@gmail.com
  // const postAuthor = await UserModel.findOne({ email: 'Admin@gmail.com' }).lean();
  // if (!postAuthor) {
  //   console.log('Can\'t find user');
  //   return;
  // }
  // // find post của postAuthor
  // const post = await PostModel.findOne({ author: postAuthor._id }).lean();

  // // find user A insert comment on post
  // const userA = await UserModel.findOne({ email: 'hacker@gmail.com' }).lean();

  // // user A insert comment
  // const data = await CommentModel.create({
  //   content: userA.name + ' đã comment trên bài post của ' + postAuthor.name,
  //   author: userA._id,
  //   post: post._id
  // })
  // // update comment cho post
  // await PostModel.updateOne({ _id: post._id }, {
  //   $addToSet: { comments: data._id }
  // })





  // 2
  // find user admin@gmail.com
  // const user = await UserModel.findOne({ email: 'Admin@gmail.com' }).lean();
  // if (!user) {
  //   console.log('Can\'t find user');
  //   return;
  // }

  // const data = await PostModel.insertMany([
  //   {
  //     content: 'bài post số 1 của admin@gmail.com',
  //     author: user._id
  //   },
  //   {
  //     content: 'bài post số 2 của admin@gmail.com',
  //     author: user._id
  //   },
  //   {
  //     content: 'bài post số 3 của admin@gmail.com',
  //     author: user._id
  //   }
  // ]);
  // // console.log(data.map(v => v._id));
  // await UserModel.updateOne(
  //   { _id: user._id },
  //   {
  //     $set: { posts: [...user.posts, ...data.map(v => v._id)] }
  //   })



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