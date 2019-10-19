

var router = require("express").Router();
var pool = require("../db/database");
var sqlHelper = require("../utils/sql-helper/sql-helper");

var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());

router.get("/", (req, res, next) => {

    let sql = "SELECT * FROM calendar WHERE user_id = " + req.user.user_id;

    sqlHelper.handleSelectAndRespond(sql, res);
});

router.get("/sharedToUser", (req, res, next) => {

    let sql = "SELECT * FROM shared_calendars WHERE sharedToUserId = " + req.user.user_id;

    sqlHelper.handleSelectAndRespond(sql, res);
});

router.get("/sharedByUser", (req, res, next) => {

    let sql = "SELECT * FROM shared_calendars WHERE sharedByUserId = " + req.user.user_id;

    sqlHelper.handleSelectAndRespond(sql, res);
});

router.post("/", (req, res) => {

    const calendar = {
        user_id: req.user.user_id,
        calendarName: req.body.calendarName
    };

    sqlHelper.handleSetObjectAndRespond("INSERT INTO calendar SET ?", calendar, res);

});

router.post("/share", (req, res) => {

    let sql = "SELECT user_id FROM user_info WHERE campusEmail = ?";

    pool.query(sql, req.body.sharedToEmail, function (error, results, fields) {

        if (error) {
            return res.json({ "success": false, "message": "Failed to connect to the database. " + error });
        }
        const calendar = {
            sharedByUserId: req.user.user_id,
            sharedToUserId: results[0].user_id,
            sharedCalendarId: req.body.sharedCalendarId,
            sharedCalendarName: req.body.sharedCalendarName
        };

        console.log(calendar);

        sqlHelper.handleSetObjectAndRespond("INSERT INTO shared_calendars SET ?", calendar, res);

    });


});

module.exports = router;
