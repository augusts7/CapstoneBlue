

var router = require("express").Router();
var pool = require("../db/database");
var sqlHandler = require("../handler/queryHandler");

var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());

router.get("/", (req, res, next) => {

    let sql = "SELECT * FROM schedulerdb.calendar WHERE user_id = ?" + req.user.user_id;

    sqlHandler.getAndSendResToClient(sql, req, res);
});

router.post("/", (req, res) => {

    const calendar = {
        user_id: req.user.user_id,
        calendarName: req.body.calendarName
    };

    sqlHandler.setObjectAndSendResToClient("INSERT INTO schedulerdb.calendar SET ?", calendar, req, res);

});

module.exports = router;
