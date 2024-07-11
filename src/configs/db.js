require("dotenv").config();

const mysql = require("mysql");
const db_config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

var connection = mysql.createPool(db_config);

connection.getConnection((err, con) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.")
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.")
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.")
    }
  }

  if (con) con.release();

  return;
});

module.exports = connection;
