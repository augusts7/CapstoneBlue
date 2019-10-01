let router = require("express").Router();
let pool = require("../db/database");
let bodyParser = require("body-parser");
let { createSlots } = require('../utils/timeSlot');

router.use(bodyParser.json());


router.get("/", function (req, res) {

    pool.query("SELECT * FROM schedulerdb.event WHERE event_type = ?", "advising", function (error, results, fields) {

        if (error) {
            res.json({ "success": false, "message": "Failed to connect to database" });
        }
        try {
            if (results.length > 0) {

                return res.json({ "success": true, "message": "Advising slots have been retrived.", "results": results });

            } else {
                res.json({ "success": false, "message": "Couldn't find any advising slots." });
            }
        } catch (err) {
            res.json({ "success": false, "message": "Error while getting advising slots. " + err });
        }

    });

})

router.route("/").post(async (req, res) => {
let { title, description, start, end, interval, creator_id, event_type, carousel } = req.body;
let slots = createSlots({start, end, interval, creator_id, title, description, event_type, carousel});
let success = await slots.map(slots=> pool.query("INSERT INTO event SET ?", slot));
res.status(200)
    .send({ success, slots});
});

module.exports = router;