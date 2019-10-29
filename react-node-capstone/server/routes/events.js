var router = require("express").Router();
var pool = require("../db/database");
var sqlHandler = require("../utils/sql-helper/sql-helper");
var bodyParser = require("body-parser");
let authMiddleware = require("../middlewares/auth-middleware").authMiddleware;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(authMiddleware);


router.get("/attending/:calendarId", function (req, res) {

    let calendarId = "" +  req.params.calendarId;

    let select = "SELECT * FROM attending INNER JOIN event ON event.eventID = attending.event_id WHERE attendee_id = " + req.user.user_id;

    sqlHandler.handleSelectAndRespond(select, res);

});

router.get("/sharedCalendar/:sharedCalId", function (req, res, next) {

    let select = "SELECT * FROM shared_calendars WHERE shared_calendars.id = " + req.params.sharedCalId;

    pool.query(select, function (error, results, fields) {

        if (error) {
            return next(error);
        }

        if (results.length > 0) {
            let sharingUserId = results[0].sharedByUserId;

            let select = "SELECT * FROM event INNER JOIN attending ON eventID = event_id WHERE attendee_id = " + sharingUserId;

            sqlHandler.handleSelectAndRespond(select, res);
        } else {
            return res.json({success: true, results: []});
        }

    });
});

router.get("/all", async (req, res) => {
    try {
        let events = await pool.query("SELECT * FROM event");
        res.json(events);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/created/:calendarId", function (req, res) {

    let calendarId = "" + req.params.calendarId;

    let select = "SELECT * FROM event WHERE creator_id = " + req.user.user_id;

    if (calendarId !== "main") {
        select = "SELECT * FROM event WHERE creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId;
    }

    sqlHandler.handleSelectAndRespond(select, res);

});


router.post("/", (req, res) => {
    const event = {
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        event_type: req.body.event_type,
        creator_id: req.user.user_id,
        carousel: req.body.carousel || "1",
    };

    sqlHandler.handleSetObjectAndRespond("INSERT INTO event SET ?", event, res);
});

router.post("/edit", (req, res) => {

    pool.query("SELECT creator_id FROM event WHERE eventID = ?", req.body.eventId, function (error, results, fields) {

        if (error) {
            return res.json({success: false, "message": error});
        }

        const event = {
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            event_type: req.body.event_type,
            creator_id: results[0].creator_id,
            carousel: req.body.carousel || "1",
            eventID: req.body.eventId
        };

        sqlHandler.handleSetObjectAndRespond("UPDATE event SET ? WHERE eventID = " + event.eventID, event, res);
    });
});


router.post("/delete", (req, res) => {

    if (req.user != null) {

        const id = req.body.eventId;

        sqlHandler.handleDeleteAndRespond("DELETE FROM event WHERE eventID = " + id, res);
    }

});


module.exports = router;
