const DBConnect = require('../dbconnect/DBConnect');
const md5 = require('md5');

const findAllUsers = async () => {
  const connection = await DBConnect.connection;
  const results = await connection.execute('SELECT * FROM users');
  return results[0];
}

const findUserById = async (id) => {
  const connection = await DBConnect.connection;
  const results = await connection.execute(
    'SELECT * FROM users WHERE id=?',
    [id]
  );
  if (results[0].length == 0)
    return null;
  return results[0][0];
}

const updateUser = async (id, fullname, username, password) => {
  const connection = await DBConnect.connection;
  const results = await connection.execute(
    'UPDATE users SET fullname=?,username=?, password=? WHERE id=?',
    [fullname, username, md5(password), id]
  );
  if (results[0].changedRows == 0) return null;
  return results[0];
}

module.exports = { findAllUsers, updateUser, findUserById }