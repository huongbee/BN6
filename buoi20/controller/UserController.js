const UserModel = require('../models/User');
const { signToken } = require('../helpers/Jwt');
const { errResponse } = require('../helpers/helper');
const redis = require('../helpers/redis');

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
      // ex 1: nếu nhập sai pass quá 5 lần liên tiếp thì khóa acc tạm thời trong 30p
      // ktra user co dang bi khoa 30p hay khong, cho biet thoi gian khoa con lai neu co
      const ttl = await redis.getTTL('CountInvalidPass'); // number
      console.log({ ttl });
      if (ttl > 0) {
        const mess = `Please try again after ${ttl} seconds`;
        return errResponse(1001, mess, res);
      }

      let count = await redis.get('CountInvalidPass');
      let countInvalidPass = count ? +count : 0;
      console.log({ countInvalidPass });

      if (user.password != password) {
        countInvalidPass++;//2
        // ktra so lan nhap sai
        if (countInvalidPass >= 5) {
          // dung redis de khoa trong 30p
          await redis.setTimeInSeconds('CountInvalidPass', true, 60);
          return errResponse(1001, 'Please try again after 1 min', res);
        }

        // luu so lan da nhap sai
        await redis.set('CountInvalidPass', countInvalidPass); //2
        console.log('user da nhap sai pass', { countInvalidPass });

        return errResponse(1001, 'Password invalid - ' + countInvalidPass, res);
      }
      // reset so lan nhap sai truoc do
      // await redis.del('CountInvalidPass');




      // TODO 2: nếu nhập sai pass quá 10 lần liên tiếp thì khóa acc

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
      return errResponse(1001, error.message, res);
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