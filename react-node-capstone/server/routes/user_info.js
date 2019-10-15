var router = require("express").Router();
var pool = require("../db/database");
var sqlHandler = require("../handler/queryHandler");

var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get("/advisors", function (req, res, next) {

    let sql = "SELECT first_name, last_name, user_id FROM schedulerdb.user_info WHERE user_type = faculty";

    sqlHandler.getAndSendResponseToClient(sql, req, res);

})


module.exports = router;
