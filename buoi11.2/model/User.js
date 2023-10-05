const DBConnect = require('../config/DBConnect');
const md5 = require('md5');

module.exports = {
  findAllUsers: async () => {
    const connection = await DBConnect.connection;
    const results = await connection.execute('SELECT * FROM users');
    return results[0];
  },

  findUserById: async (id) => {
    const connection = await DBConnect.connection;
    const results = await connection.execute(
      'SELECT * FROM users WHERE id=?',
      [id]
    );
    if (results[0].length == 0)
      return null;
    return results[0][0];
  },
  updateUser: async (id, fullname, username, password) => {
    const connection = await DBConnect.connection;
    const results = await connection.execute(
      'UPDATE users SET fullname=?,username=?, password=? WHERE id=?',
      [fullname, username, md5(password), id]
    );
    if (results[0].changedRows == 0) return null;
    return true;
  },

  removeUser: async (id) => {
    const connection = await DBConnect.connection;
    const results = await connection.execute(
      'DELETE FROM users WHERE id=?',
      [id]
    );
    // console.log(results[0]);
    if (results[0].affectedRows == 0) return null;
    return true;
  }

};

// module.exports = { findAllUsers, updateUser, findUserById }