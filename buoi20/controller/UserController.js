const UserModel = require('../models/User');
const User = new UserModel();

module.exports = {
  register: async (req, res) => {
    const { email, password, fullname, gender, birthday } = req.body
    const user = await User.create(email, password, fullname, gender, birthday);
    if (typeof user == 'object') {
      return res.json({
        code: 1000,
        data: {
          email: user.email,
          fullname: user.fullname,
          gender: user.gender,
          birthday: user.birthday
        }
      });
    }
    console.log(user);

    return res.json({
      code: 1001,
      message: 'Register fail',
      data: null
    });
  },
  login: async () => {
  },
}