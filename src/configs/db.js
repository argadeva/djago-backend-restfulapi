require("dotenv").config();

const mysql = require("mysql");
const db_config = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function(err) {
    if(err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", function(err) {
    console.log("db error", err);
    if(err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
