const mysql = require('mysql2/promise');
const md5 = require('md5');

(async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'BN6'
  });
  // const results = await connection.execute(
  //   'SELECT * FROM users where id IN (?,?)',
  //   [1, 3]
  // );
  // console.log(results[0]);
  const results = await connection.execute(
    'INSERT INTO Users (fullname, username, password) VALUES (?,?,?)',
    ['Lê Thanh Thủy', 'thuy.lt', md5('111111')]
  );
  console.log('Inserted userId = ' + results[0].insertId);
})();