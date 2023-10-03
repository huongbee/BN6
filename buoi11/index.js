const mysql = require('mysql2');
const md5 = require('md5');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'BN6'
}).on('error', (err) => {
  console.log('Error connecting to MySQL');
  console.log('Error code ' + err.code);
})

// insert
// connection.execute(
//   'INSERT INTO Users (fullname, username, password) VALUES (?,?,?)',
//   ['Trần Thị Diễm Phúc', 'phuc.ttd', md5('111111')],
//   (err, results) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log('Inserted userId = ' + results.insertId);
//     }
//   }
// );
// connection.execute(
//   'UPDATE Users SET fullname = ?, username = ? WHERE id = ?',
//   ['Trần Văn Bình', 'binh.tv', 5],
//   (err, results) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log('ChangedRows = ' + results.changedRows);
//     }
//   }
// );
// connection.execute(
//   'DELETE FROM Users WHERE id = ?',
//   [5],
//   (err, results) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log(results);
//     }
//   }
// );
connection.query('SELECT * FROM users', (err, results, fields) => {
  if (err) console.log(err.message);
  console.log(results);
  // console.log(fields);
})