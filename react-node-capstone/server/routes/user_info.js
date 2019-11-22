var router = require("express").Router();
var pool = require("../db/database");
var sqlHandler = require("../utils/sql-helper/sql-helper");
var bodyParser = require("body-parser");
let authMiddleware = require("../middlewares/auth-middleware").authMiddleware;


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(authMiddleware);


router.get("/advisors", function (req, res, next) {

    console.log("calling advisors");

    let sql = "SELECT first_name, last_name, user_id FROM user_info WHERE user_type = 'faculty'";

    sqlHandler.handleSelectAndRespond(sql, res);

});


router.get("/userList", function (req, res, next) {

    console.log("get all users");

    let sql = "SELECT first_name, last_name, user_id, campusEmail FROM user_info";

    sqlHandler.handleSelectAndRespond(sql, res);

});

router.get("/", function (req, res, next) {

    console.log("get user info");

    let sql = "SELECT * FROM user_info";

    sqlHandler.handleSelectAndRespond(sql, res);

});


module.exports = router;
