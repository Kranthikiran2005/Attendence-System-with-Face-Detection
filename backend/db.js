require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "kranthi_mysql#",
  database: process.env.DB_NAME
});

module.exports = pool.promise();