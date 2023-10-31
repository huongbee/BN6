const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../configs/common_constants');

module.exports = {
  signToken(id, email, fullname) {
    return jwt.sign({ id, email, fullname }, JWT_SECRET_KEY, { expiresIn: 30 * 86400 })
    // store token into DB {userId, token, createdAt}
  },
  verifyToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY)
  }
};