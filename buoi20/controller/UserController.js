const CryptoJS = require("crypto-js");
const moment = require("moment");
const UserModel = require('../models/User');
const { signToken } = require('../helpers/Jwt');
const { errResponse } = require('../helpers/helper');
const redis = require('../helpers/redis');
const { VERIFY_MAIL_KEY } = require('../configs/common_constants');

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
      const ttl = await redis.getTTL(`CountInvalidPass:user-${user._id}`); // number
      console.log({ ttl });
      if (ttl > 0) {
        const mess = `Please try again after ${ttl} seconds`;
        return errResponse(1001, mess, res);
      }

      let count = await redis.get(`CountInvalidPass:user-${user._id}`);
      let countInvalidPass = count ? +count : 0;
      console.log({ countInvalidPass });

      if (user.password != password) {
        countInvalidPass++;//2
        // ktra so lan nhap sai
        if (countInvalidPass >= 5) {
          // dung redis de khoa trong 30p
          await redis.setTimeInSeconds(`CountInvalidPass:user-${user._id}`, true, 60);
          return errResponse(1001, 'Please try again after 1 min', res);
        }

        // luu so lan da nhap sai
        await redis.set(`CountInvalidPass:user-${user._id}`, countInvalidPass); //2
        console.log('user da nhap sai pass', { countInvalidPass });

        return errResponse(1001, 'Password invalid - ' + countInvalidPass, res);
      }
      // reset so lan nhap sai truoc do
      // await redis.del('CountInvalidPass');




      // TODO 2: nếu nhập sai pass quá 10 lần liên tiếp thì khóa acc vinh vien (lưu trong)

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
      const user = await User.findUserByEmail(email);
      if (!user) {
        return errResponse(1001, 'Can not find user', res);
      }
      const data = await User.updateUserInfo(id, fullname, birthday, user.password);
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
  },
  forgetPasswordByEmail: async (req, res) => {
    const { email } = req.body;
    const user = await User.findUserByEmail(email);
    if (!user) {
      return errResponse(1001, 'Can not find user', res);
    }

    // tao link gui mail,
    const data = {
      id: user._id,
      email: user.email
      // expiredAt: new Date(moment().add(15, 'mins')).getTime() // hết hạn trong 15p
    };
    const token = CryptoJS.AES.encrypt(JSON.stringify(data), VERIFY_MAIL_KEY).toString();
    const link = `http://localhost:3000/verify/${token}`
    // luu link lai de ktra link da su dung hay chua
    await redis.setTimeInSeconds(`verifyLink:user-${user._id}`, token, 15 * 60);
    // U2FsdGVkX19TnYStqQHtt+X432xE2qhqbR+bu6ZcsnA=
    // gui mail
    console.log({ link });
    return res.json({
      code: 1000,
      data: null,
      message: 'Link was sent to email'
    });
  },
  verifyForgetPasswordByEmail: async (req, res) => {
    try {
      const token = req.params[0];
      const data = JSON.parse(CryptoJS.AES.decrypt(token, VERIFY_MAIL_KEY).toString(CryptoJS.enc.Utf8));
      // console.log(token, data);
      // ktra link đã sử dụng trước đó hay chưa?
      const checkLinkExist = await redis.get(`verifyLink:user-${data.id}`);
      if (!checkLinkExist) {
        return errResponse(1001, 'Link does not valid', res);
      }
      // xoa token da luu  trong redis
      await redis.del(`verifyLink:user-${data.id}`);
      return res.json({
        code: 1000,
        data: null,
        message: 'Success'
      });
    } catch (error) {
      console.log(error.message);
      return errResponse(1001, 'Please try again', res);
    }
  },
  resetPassword: async (req, res) => {
    const { userId, email, password, repassword } = req.body;
    if (password != repassword) {
      return errResponse(1001, 'Password not same', res);
    }
    const user = await User.findUserByEmail(email);
    if (!user) {
      return errResponse(1001, 'Can not find user', res);
    }
    const data = await User.updateUserInfo(userId, user.fullname, user.birthday, password);
    if (!data) {
      return errResponse(1001, 'Update failed', res);
    }
    return res.json({
      code: 1000,
      data: null,
      message: 'Update successfully'
    });
  }
}