var router = require("express").Router();
var pool = require("../db/database");
var sqlHandler = require("../utils/sql-helper/sql-helper");
var bodyParser = require("body-parser");
let authMiddleware = require("../middlewares/auth-middleware").authMiddleware;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(authMiddleware);

router.get("/advisors", function(req, res, next) {
  console.log("calling advisors");

  let sql =
    "SELECT first_name, last_name, user_id FROM user_info WHERE user_type = 'faculty'";

  sqlHandler.handleSelectAndRespond(sql, res);
});

router.get("/userList", function(req, res, next) {
  console.log("get all users");

  let sql = "SELECT first_name, last_name, user_id, campusEmail FROM user_info";

  sqlHandler.handleSelectAndRespond(sql, res);
});

router.get("/", function(req, res, next) {
  console.log("get user info");

  let sql = "SELECT * FROM user_info WHERE user_id = " + req.user.user_id;
  sqlHandler.handleSelectAndRespond(sql, res);
});

router.route("/user").get(async (req, res) => {
  try {
    console.log("get specific user info");
    let user_id = req.user.user_id;
    console.log("UID ->" + user_id);
    let user_info = await pool.query(
      "SELECT user_id FROM user_info WHERE user_id = " + user_id + ";"
    );
    res.json(user_info);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
