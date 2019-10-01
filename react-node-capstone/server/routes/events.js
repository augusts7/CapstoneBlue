var router = require("express").Router();
var pool = require("../db/database");
const passport = require("passport");

var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get("/attending", function (req, res) {

    let select = "SELECT * FROM schedulerdb.attending INNER JOIN schedulerdb.event ON " +
        "schedulerdb.event.eventID = schedulerdb.attending.event_id WHERE attendee_id = ? ";

    console.log(req.user.user_id);

    pool.query(select, req.user.user_id, function (error, results, fields) {

        if (error) {
            return res.json({ "success": false, "message": "Failed to connect to database" });
        }
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


router.get("/created", function (req, res) {

    console.log("created");

    console.log(req.user);

    pool.query("SELECT * FROM schedulerdb.event WHERE creator_id = ? ", req.user.user_id, function (error, results, fields) {

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
