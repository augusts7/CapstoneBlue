var router = require("express").Router();
var pool = require("../db/database");

//Makes app accept JSON objects.
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.get("/", (req, res, next) => {

    try {

        pool.query("SELECT * FROM schedulerdb.calendar WHERE user_id = ?", req.user.user_id, function (error, results, fields) {

            if (error) {
                return res.json({ "success": false, "message": "Failed to connect to database" });
            }
            try {
                if (results.length > 0) {

                    console.log("Calendar get = " + results);

                    return res.json({ "success": true, "message": "Calendar data has been retrieved.", "results": results });

                } else {
                    return res.json({ "success": false, "message": "Couldn't find any calendars." });
                }
            } catch (err) {
                return res.json({ "success": false, "message": "Error while getting calendar data. " + err });
            }

        });
       
    } catch (e) {
        console.log(e);
        return res.json({ "success": false, "message": "Error while getting calendar data. " + err });
    }
});

//Post
router.post("/", (req, res) => {

    const calendar = {
        user_id: req.user.user_id,
        calendarName: req.body.calendarName
    };

    pool.query("INSERT INTO schedulerdb.calendar SET ?", calendar, function (error, results, fields) {

        if (error) {
            return res.json({ "success": false, "message": "Failed to connect to database" });
        }
        try {
            if (results.length > 0) {

                console.log("Calendar inserted. Id = " + results.insertId);

                return res.json({ "success": true });

            } else {
                return res.json({ "success": false, "message": "Couldn't add calendar data." });
            }
        } catch (err) {
            return res.json({ "success": false, "message": "Server error. " + err });
        }

    });
});

module.exports = router;
