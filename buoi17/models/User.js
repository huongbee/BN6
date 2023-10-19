const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  name: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  receiveRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sendRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;