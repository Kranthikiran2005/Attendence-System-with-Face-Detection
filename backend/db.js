// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kranthi_mysql#',
  database: 'attendance_db'
});

module.exports = pool.promise(); 