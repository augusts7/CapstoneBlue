let router = require("express").Router();
let pool = require("../db/database");
let bodyParser = require("body-parser");
let { getSlots } = require('../utils/timeSlot');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get("/all/:calendarId", function (req, res) {

    try {

        console.log("Advising All. User is " + req.user.user_id);

        if (req.user.user_type == "student") {

            console.log("Select student data. ");

            pool.query("SELECT advisor_id FROM schedulerdb.student_info WHERE user_id = ?", req.user.user_id, function (error, results, fields) {

                if (error) {
                    return res.json({ "success": false, "message": "Failed to connect to database" });
                }

                if (results.length > 0) {

                    let sql = "SELECT * FROM schedulerdb.event WHERE event_type = 'advising' AND creator_id = " + results[0].advisor_id;
                    if (req.params.calendarId != "main") {
                        sql = "SELECT * FROM schedulerdb.event WHERE event_type = 'advising' AND creator_id = " + results[0].advisor_id + " AND creator_calendar_id = " + req.params.calendarId;
                    }

                    pool.query(sql, function (error, results, fields) {

                        if (error) {
                            return res.json({ "success": false, "message": "Failed to connect to database" });
                        }
                        try {
                            if (results.length > 0) {

                                console.log("advising/all=> results => " + results);

                                return res.json({ "success": true, "message": "Advising slots have been retrived.", "results": results });

                            } else {
                                return res.json({ "success": false, "message": "Couldn't find any advising slots." });
                            }
                        } catch (err) {
                            return res.json({ "success": false, "message": "Error while getting advising slots. " + err });
                        }

                    });

                } else {
                    return res.json({ "success": false, "message": "Couldn't find any advising slots." });
                }


            });
        } else {
            console.log("Select faculty data. ");

            let sql = "SELECT * FROM schedulerdb.event WHERE event_type = 'advising' AND creator_id = " + req.user.user_id;

            if (req.params.calendarId != "main") {
                sql = "SELECT * FROM schedulerdb.event WHERE event_type = 'advising' AND creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId;
            }

            pool.query(sql, function (error, results, fields) {

                if (error) {
                    return res.json({ "success": false, "message": "Failed to connect to database" });
                }
                try {
                    if (results.length > 0) {

                        return res.json({ "success": true, "message": "Advising slots have been retrived.", "results": results });

                    } else {
                        return res.json({ "success": false, "message": "Couldn't find any advising slots." });
                    }
                } catch (err) {
                    return res.json({ "success": false, "message": "Error while getting advising slots. " + err });
                }

            });
        }
    } catch (err) {
        return res.json({ "success": false, "message": "Error while getting advising slots. " + err });
        console.log("Router => advising . " + err);
    }
})


router.post("/attend/:calendarId", async function (req, res) {

    try {

        await pool.query("SELECT advisor_id FROM schedulerdb.student_info WHERE user_id = ?", req.user.user_id, async function (error, result, fields) {

            if (error) {
                return res.json({ "success": false, "message": "Failed to connect to database" });
            }
            try {
                if (result.length > 0) {

                    const studentData = {
                        event_id: req.body.eventID,
                        attendee_id: req.user.user_id
                    };

                    const facultyData = {
                        event_id: req.body.eventID,
                        attendee_id: result[0].advisor_id
                    };

                    if (req.params.calendarId != "main") {
                        studentData.calendar_id = req.params.calendarId;
                    }

                    let values = [studentData, facultyData];

                    await values.forEach(async function (value) {
                        await pool.query("INSERT INTO schedulerdb.attending SET ?", value);
                    });

                    

                    return res.json({ "success": true });

                } else {
                    return res.json({ "success": false, "message": "Couldn't add the advising slot to your database." });
                }
            } catch (err) {
                return res.json({ "success": false, "message": "Error while adding advising slots to your database. " + err });
            }

        });


    } catch (err) {
        return res.json({ "success": false, "message": "Error while getting advising slots. " + err });
        console.log("Router => advising . " + err);
    }
})


router.post("/:calendarId", async function (req, res) {
    
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
            calendar_id: req.body.calendar_id
        };

        let slots = getSlots(data.start, data.end, data.interval, data.creator_id, data.title, data.description, data.event_type, data.carousel);

        await slots.forEach(async function (slot) {

            if (req.params.calendarId != "main") {
                slot.creator_calendar_id = req.params.calendarId;
            }

            await pool.query("INSERT INTO schedulerdb.event SET ?", slot);
        });

        return res.json({ "success": true });
        


    } catch (err) {
        return res.json({ "success": false, "message": "Error in the advising routing function. " + err });
    }

});

module.exports = router;