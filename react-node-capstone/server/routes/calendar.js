const router = require("express").Router();
const pool = require("../db/database");
const sqlHelper = require("../utils/sql-helper/sql-helper");
const bodyParser = require("body-parser");
const authMiddleware = require("../middlewares/auth-middleware").authMiddleware;
const socket = require("../utils/socket/socket");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(authMiddleware);


router.get("/", (req, res, next) => {

    let sql = "SELECT * FROM calendar WHERE user_id = " + req.user.user_id;

    sqlHelper.handleSelectAndRespond(sql, res);
});

router.get("/sharedToUser", (req, res, next) => {

    let sql = "SELECT * FROM shared_calendars INNER JOIN calendar ON sharedCalendarId = calendarId INNER JOIN user_info ON sharedByUserId = user_info.user_id WHERE sharedToUserId = " + req.user.user_id;

    sqlHelper.handleSelectAndRespond(sql, res);
});

router.post("/sharedToUser/delete", (req, res, next) => {

    const calendarId = req.body.id;

    let sql = "DELETE FROM shared_calendars WHERE sharedToUserId = " + req.user.user_id + " AND id = " + calendarId;

    sqlHelper.handleDeleteAndRespond(sql, res);
});

router.post("/delete", (req, res, next) => {

    const calendarId = req.body.id;

    let sql = "DELETE FROM calendar WHERE user_id = " + req.user.user_id + " AND calendarId = " + calendarId;

    sqlHelper.handleDeleteAndRespond(sql, res);
});

router.get("/sharedByUser", (req, res, next) => {

    let sql = "SELECT * FROM shared_calendars INNER JOIN calendar ON sharedCalendarId = calendarId INNER JOIN user_info ON sharedToUserId = user_info.user_id WHERE sharedByUserId = " + req.user.user_id;

    sqlHelper.handleSelectAndRespond(sql, res);
});

router.post("/sharedByUser/delete", (req, res, next) => {

    const calendarId = req.body.id;

    let sql = "DELETE FROM shared_calendars WHERE sharedByUserId = " + req.user.user_id + " AND id = " + calendarId;

    sqlHelper.handleDeleteAndRespond(sql, res);
});

router.get("/groupCalendars", (req, res, next) => {

    let sql = "SELECT my_groups.group_id , groups.group_name FROM my_groups,groups WHERE groups.group_id = my_groups.group_id AND user_id=" +
        req.user.user_id +
        ";";

    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error);
            return next(error);
        }

        return res.json({success: true, results});
    });


});

router.post("/", (req, res) => {

    const calendar = {
        user_id: req.user.user_id,
        calendarName: req.body.calendarName
    };

    sqlHelper.handleSetObjectAndRespond("INSERT INTO calendar SET ?", calendar, res);

});

router.post("/share", (req, res, next) => {

    let sql = "SELECT user_id FROM user_info WHERE campusEmail = ?";

    pool.query(sql, req.body.sharedToEmail, function (error, results, fields) {

        console.log("Start share calendar");

        if (error) {
            return next("Failed to connect to the database. " + error);
        }
        const calendar = {
            sharedByUserId: req.user.user_id,
            sharedToUserId: results[0].user_id,
            sharedCalendarId: req.body.sharedCalendarId,
            sharedCalendarName: req.body.sharedCalendarName
        };

        socket.broadcastToUser(calendar.sharedToUserId, "newCalendarShared", calendar);

        console.log(calendar);

        sqlHelper.handleSetObjectAndRespond("INSERT INTO shared_calendars SET ?", calendar, res);

    });


});

module.exports = router;
