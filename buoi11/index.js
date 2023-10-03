const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'BN6'
}).on('error', (err) => {
  console.log('Error connecting to MySQL');
  console.log('Error code ' + err.code);
})