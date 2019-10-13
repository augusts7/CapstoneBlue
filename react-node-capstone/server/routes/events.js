var router = require("express").Router();
var pool = require("../db/database");
const passport = require("passport");

var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get("/attending/:calendarId", function (req, res) {

    let select = "SELECT * FROM schedulerdb.attending INNER JOIN schedulerdb.event ON schedulerdb.event.eventID = schedulerdb.attending.event_id WHERE attendee_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM schedulerdb.attending INNER JOIN schedulerdb.event ON schedulerdb.event.eventID = schedulerdb.attending.event_id WHERE attendee_id = " + req.user.user_id + " AND calendar_id = " + req.params.calendarId;
    }

    console.log(req.user.user_id);

    pool.query(select, function (error, results, fields) {

        if (error) return next("Failed to connect to the database")
        try {
            if (results.length > 0) {

                console.log("Advising attending = " + results);

                return res.json({ "success": true, "message": "Attending data has been retrieved.", "results": results });

            } else {
                return res.json({ "success": false, "message": "Couldn't find any attending events." });
            }
        } catch (err) {
            return res.json({ "success": false, "message": "Error while getting attending data. " + err });
        }

    });

})


router.get("/created/:calendarId", function (req, res) {

    console.log("created");

    console.log(req.user);
    console.log(req.user.user_id);

    let select = "SELECT * FROM schedulerdb.event WHERE creator_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM schedulerdb.event WHERE creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId;
    }

    pool.query(select, function (error, results, fields) {

        if (error) {
            return res.json({ "success": false, "message": "Failed to connect to database" });
        }
        try {
            if (results.length > 0) {

                console.log("Advising created = " + results);

                return res.json({ "success": true, "message": "Created events data has been retrieved.", "results": results });

            } else {
                return res.json({ "success": false, "message": "Couldn't find any created events." });
            }
        } catch (err) {
            return res.json({ "success": false, "message": "Error while getting created events data. " + err });
        }

    });

})



module.exports = router;
