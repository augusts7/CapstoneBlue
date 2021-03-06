const router = require("express").Router();
const pool = require("../db/database");
const sqlHandler = require("../utils/sql-helper/sql-helper");
const bodyParser = require("body-parser");
const authMiddleware = require("../middlewares/auth-middleware").authMiddleware;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(authMiddleware);

router.get("/advisors", function(req, res, next) {
  let sql =
    "SELECT first_name, last_name, user_id FROM user_info WHERE user_type = 'faculty'";

  sqlHandler.handleSelectAndRespond(sql, res);
});

router.get("/userList", function(req, res, next) {

  let sql = "SELECT first_name, last_name, user_id, campusEmail FROM user_info";

  sqlHandler.handleSelectAndRespond(sql, res);
});

router.get("/createdUsers", function (req, res, next) {

    let sql = "SELECT * FROM user_info WHERE creator_user_id = " + req.user.user_id;

    sqlHandler.handleSelectAndRespond(sql, res);
});

router.get("/studentInfo/:userId", function (req, res, next) {

    let sql = "SELECT * FROM student_info WHERE user_id = " + req.params.userId;

    sqlHandler.handleSelectAndRespond(sql, res);
});

router.get("/studentInfoWithAdvisor/:userId", function (req, res, next) {

    let sql = "SELECT * FROM student_info INNER JOIN user_info ON advisor_id = user_info.user_id WHERE student_info.user_id = " + req.params.userId;

    sqlHandler.handleSelectAndRespond(sql, res);
});

router.post("/createdUsers/delete", function (req, res, next) {
    const deletedUserId = req.body.user_id;

    let sql = "DELETE FROM user_info WHERE creator_user_id = " + req.user.user_id + " AND user_id = " + deletedUserId;

    sqlHandler.handleDeleteAndRespond(sql, res);
});

router.get("/", function (req, res, next) {
    let sql = "SELECT * FROM user_info WHERE user_id = " + req.user.user_id;

    sqlHandler.handleSelectAndRespond(sql, res);
});

router.route("/user").get(async (req, res) => {
  try {
    let user_id = req.user.user_id;
    let user_info = await pool.query(
      "SELECT user_id FROM user_info WHERE user_id = " + user_id + ";"
    );
    res.json(user_info);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
