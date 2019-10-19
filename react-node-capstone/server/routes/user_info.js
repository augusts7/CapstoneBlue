var router = require("express").Router();
var pool = require("../db/database");
var sqlHandler = require("../utils/sql-helper/sql-helper");

var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get("/advisors", function (req, res, next) {

    let sql = "SELECT first_name, last_name, user_id FROM user_info WHERE user_type = 'faculty'";

    sqlHandler.handleSelectAndRespond(sql, res);

});


module.exports = router;
