const UserModel = require('../models/User');
const { signToken } = require('../helpers/Jwt');
const { errResponse } = require('../helpers/helper');

const User = new UserModel();

module.exports = {
  register: async (req, res) => {
    const { email, password, fullname, gender, birthday } = req.body;
    try {
      const user = await User.create(email, password, fullname, gender, birthday);
      return res.json({
        code: 1000,
        data: {
          email: user.email,
          fullname: user.fullname,
          gender: user.gender,
          birthday: user.birthday
        }
      });
    } catch (error) {
      return res.json({
        code: 1001,
        message: error.message,
        data: null
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findUserByEmail(email);
      if (!user) {
        return errResponse(1001, 'Can not find user', res);
      }
      // TODO: nếu nhập sai pass quá 5 lần liên tiếp thì khóa acc tạm thời trong 30p
      // TODO: nếu nhập sai pass quá 10 lần liên tiếp thì khóa acc
      if (user.password != password) {
        return errResponse(1001, 'Password invalid', res);
      }
      const token = signToken(user._id, user.email, user.fullname);
      return res.json({
        code: 1000,
        data: {
          email: user.email,
          fullname: user.fullname,
          gender: user.gender,
          birthday: user.birthday
        },
        token
      });
    } catch (error) {
      return errResponse(1001, err.message, res);
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { fullname, birthday } = req.body;
      const { id, email } = req.userInfo; // userInfo get from middleware verifyUserLogin
      const data = await User.updateUserInfo(id, fullname, birthday);
      if (!data) {
        return errResponse(1001, 'Update failed', res);
      }
      return res.json({
        code: 1000,
        data: null,
        message: 'Update successfully'
      });
    } catch (error) {
      return errResponse(1001, error.message, res);

    }
  }
}