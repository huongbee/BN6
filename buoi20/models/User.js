const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  fullname: String,
  gender: String,
  birthday: Date
});
const UserModel = mongoose.model('User', UserSchema);

class User {
  create = (email, password, fullname, gender, birthday) => {
    return UserModel.create({ email, password, fullname, gender, birthday })
      .then(result => result);
  }
  findUserByEmail = (email) => {
    return UserModel.findOne({ email }).lean();
  }
  updateUserInfo = (id, fullname, birthday) => {
    return UserModel.updateOne(
      { _id: id },
      {
        $set: { fullname, birthday }
      })
      .then(result => result.modifiedCount == 1 ? true : false);
  }
}

module.exports = User;