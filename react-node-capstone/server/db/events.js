const mysql = require("mysql");

const pool = mysql.createConnection({
  connectionLimit: 25,
  host: "event-scheduler-db.cfuzjkgst1bk.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "CapstoneBlue",
  database: "ulmschedulerdb",
  port: "3306"
});

let events = {};

events.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM events", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports = events;
