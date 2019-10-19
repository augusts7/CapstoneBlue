let router = require("express").Router();
let pool = require("../db/database");
let bodyParser = require("body-parser");
let { getSlots } = require('../utils/timeSlot');
let sqlHelper = require("../utils/sql-helper/sql-helper");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get("/all", function (req, res) {

    let userType = "" + req.user.user_type;

    if (userType === "student") {

        pool.query("SELECT advisor_id FROM student_info WHERE user_id = ?", req.user.user_id, function (error, results, fields) {

            if (error) {
                return res.json({"success": false, "message": "Failed to connect to database"});
            }

            if (results.length > 0) {

                let sql = "SELECT * FROM event WHERE event_type = 'advising' AND creator_id = " + results[0].advisor_id;

                sqlHelper.handleSelectAndRespond(sql, res);

            } else {
                return res.json({"success": false, "message": "Couldn't find any advising slots."});
            }


        });
    } else {
        let sql = "SELECT * FROM event WHERE event_type = 'advising' AND creator_id = " + req.user.user_id;

        sqlHelper.handleSelectAndRespond(sql, res);
    }
});



router.post("/attend", function (req, res) {

    pool.query("SELECT advisor_id FROM student_info WHERE user_id = ?", req.user.user_id, async function (error, result, fields) {

        if (error) {
            return res.json({success: false, message: "Failed to connect to database"});
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

            return res.json({"success": true});

        } else {
            return res.json({success: false, message: "Couldn't add advising slot to the database"});
        }

    });
});


router.post("/", async function (req, res) {

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
        return res.json({"success": false, "message": "Error in the advising routing function. " + err});
    }

});

module.exports = router;