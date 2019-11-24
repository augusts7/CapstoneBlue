let router = require("express").Router();
let pool = require("../db/database");
let bodyParser = require("body-parser");
let { getSlots } = require('../utils/timeSlot');
let sqlHelper = require("../utils/sql-helper/sql-helper");
let authMiddleware = require("../middlewares/auth-middleware").authMiddleware;
const socket = require("../utils/socket/socket");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(authMiddleware);


router.get("/all", function (req, res, next) {

    let userType = "" + req.user.user_type;

    console.log(userType);

    if (userType === "student") {

        pool.query("SELECT advisor_id FROM student_info WHERE user_id = ?", req.user.user_id, function (error, results, fields) {

            if (error) {
                return next("Failed to connect to database");
            }

            if (results.length > 0) {

                let sql = "SELECT * FROM event WHERE event_type = 'advising' AND available != 'n' AND creator_id = " + results[0].advisor_id;

                sqlHelper.handleSelectAndRespond(sql, res);

            } else {
                return next("Couldn't find any advising slots.");
            }
        });
    } else {
        let sql = "SELECT * FROM event WHERE event_type = 'advising' AND creator_id = " + req.user.user_id;

        sqlHelper.handleSelectAndRespond(sql, res);
    }
});



router.post("/attend", function (req, res, next) {

    pool.query("SELECT advisor_id FROM student_info WHERE user_id = ?", req.user.user_id, async function (error, result, fields) {

        if (error) {
            return next("Failed to connect to database");
        }
        if (result.length > 0) {

            const studentData = {
                event_id: req.body.eventID,
                attendee_id: req.user.user_id
            };

            const facultyData = {
                event_id: req.body.eventID,
                attendee_id: result[0].advisor_id
            };

            let values = [studentData, facultyData];

            await values.forEach(async function (value) {
                await pool.query("INSERT INTO attending SET ?", value);
            });

            await pool.query("SELECT * FROM event WHERE eventID = ?", studentData.event_id, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return next(error);
                }
                if (results.length > 0) {
                    socket.broadcastToUser(studentData.attendee_id, "newAttendingEvent", results[0]);
                    socket.broadcastToUser(facultyData.attendee_id, "newAttendingEvent", results[0]);
                }
            });

            await pool.query("UPDATE event SET available = 'n' WHERE eventID = " + facultyData.event_id, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return next(error);
                }

            });

            return res.json({"success": true});

        } else {
            return next("Couldn't add advising slot to the database");
        }

    });
});


router.post("/", async function (req, res, next) {

    try {
        let data = {
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            interval: req.body.interval,
            creator_id: req.user.user_id,
            event_type: "advising",
            carousel: req.body.carousel,
            creator_calendar_id: req.body.creator_calendar_id
        };

        let slots = getSlots(data.start, data.end, data.interval, data.creator_id, data.title, data.description, data.event_type, data.carousel);

        await slots.forEach(async function (slot) {
            await pool.query("INSERT INTO schedulerdb.event SET ?", slot);
        });

        return res.json({"success": true});


    } catch (err) {
        return next("Error in the advising routing function. " + err);
    }

});

module.exports = router;