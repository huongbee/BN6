const _ = require('lodash');
const { verifyToken } = require('../helpers/Jwt');
const { errResponse } = require('../helpers/helper');

module.exports = {
  verifyUserLogin(req, res, next) {
    // const token = req.headers['user-token']
    try {
      const token = _.get(req.headers, 'user-token', null);
      const data = verifyToken(token);
      req.userInfo = { id: data.id, email: data.email };
      next();
    } catch (error) {
      return errResponse(1001, 'Token invalid', res);
    }
  }
};

// authenticate
// authorized