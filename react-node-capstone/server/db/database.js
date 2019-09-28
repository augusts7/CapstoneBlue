const util = require("util");
const mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 25,
  host: "event-scheduler-db.cfuzjkgst1bk.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "CapstoneBlue",
  database: "schedulerdb",
  port: "3306"
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) connection.release();

  return;
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
