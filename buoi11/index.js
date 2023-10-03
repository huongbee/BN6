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
connection.execute(
  'INSERT INTO `Users` (`fullname`, `username`, `password`) VALUES (?,?,?)',
  ['John Henry', 'john.h', md5('111111')],
  (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Inserted userId = ' + results.insertId);
    }
  }
)