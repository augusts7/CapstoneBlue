const router = require("express").Router();
const pool = require("../db/database");
const sqlHelper = require("../utils/sql-helper/sql-helper");
const bodyParser = require("body-parser");
const authMiddleware = require("../middlewares/auth-middleware").authMiddleware;

router.use(
    bodyParser.urlencoded({
        extended: false
    })
);
router.use(bodyParser.json());
router.use(authMiddleware);

router.get("/attending/:calendarId", function (req, res) {
    const calendarId = "" + req.params.calendarId;
    let select;

    if (calendarId.length === 0 || calendarId === "main") {
        select =
            "SELECT * FROM attending INNER JOIN event ON event.eventID = attending.event_id WHERE attendee_id = " +
            req.user.user_id + " AND (calendar_id = 'main' OR calendar_id = '' OR calendar_id is NULL)";

    } else {
        select =
            "SELECT * FROM attending INNER JOIN event ON event.eventID = attending.event_id WHERE attendee_id = " +
            req.user.user_id + " AND calendar_id = " + calendarId;
    }

    sqlHelper.handleSelectAndRespond(select, res);
});

router.get("/attendingUsers/", function (req, res) {
    const eventId = req.body.eventID;

    const select = "SELECT * FROM attending INNER JOIN user_info ON attendee_id = user_id WHERE eventID = " + eventId
        + " user_id != " + req.user.user_id;

    sqlHelper.handleSelectAndRespond(select, res);
});

router.get("/sharedCalendar/:sharedCalId", function (req, res, next) {
    let select =
        "SELECT * FROM shared_calendars WHERE shared_calendars.id = " +
        req.params.sharedCalId;

    pool.query(select, function (error, results, fields) {
        if (error) {
            return next(error);
        }

        if (results.length > 0) {
            let sharingUserId = results[0].sharedByUserId;
            let sharedCalendarId = results[0].sharedCalendarId;

            let select =
                "SELECT * FROM event INNER JOIN attending ON eventID = event_id WHERE attendee_id = " +
                sharingUserId + " AND calendar_id = " + sharedCalendarId;

            sqlHelper.handleSelectAndRespond(select, res);
        } else {
            return res.json({
                success: true,
                results: []
            });
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

router.route("/allOnCalendar/:user_id").get((req, res) => {
    try {
        const user_id = req.param.user_id;
        pool.query(
            "SELECT title, description, start, end FROM event JOIN attending a on eventID = a.event_id WHERE event_type = 'global' AND a.attendee_id = ?",
            [user_id],
            function (error, results, fields) {
                if (error) {
                    return next("Failed to connect to database");
                }

                if (results.length > 0) {
                    res.json(results);
                    console.log(JSON.stringify(results));
                }
            }
        );
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/notattendingGlobal", async (req, res) => {
    try {
        let events = await pool.query(
            "SELECT * FROM event WHERE event_type = 'global' AND status='approved'"
        );
        res.json(events);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/attendingGlobal", async (req, res) => {
    try {
        let globalEvents = await pool.query(
            "SELECT e.title, e.description, e.start, e.end, e.eventID FROM event e inner join attending a on e.eventID = a.event_id WHERE a.attendee_id = '" +
            req.user.user_id +
            "' AND e.event_type = 'global';"
        );
        res.json(globalEvents);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/approveEvent", async (req, res) => {
    try {
        let events = await pool.query(
            "SELECT * FROM event WHERE event_type = 'global' AND status='pending'"
        );
        res.json(events);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put("/approveEvent/update", function (req, res) {
    let eventID = req.body.event_id;
    console.log(eventID);
    try {
        pool.query(
            "UPDATE event SET status = 'approved' WHERE eventID = " + eventID
        );
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get("/created/:calendarId", function (req, res) {
    let calendarId = "" + req.params.calendarId;

    let select = "SELECT * FROM event WHERE creator_id = " + req.user.user_id;

    if (calendarId !== "main") {
        select =
            "SELECT * FROM event WHERE creator_id = " +
            req.user.user_id +
            " AND creator_calendar_id = " +
            req.params.calendarId;
    }

    sqlHelper.handleSelectAndRespond(select, res);
});

router.post("/", (req, res) => {
    const event = {
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        event_type: req.body.event_type,
        creator_id: req.user.user_id,
        creator_calendar_id: req.body.calendar_id,
        carousel: req.body.carousel || "1",
        status: req.body.status
    };

    sqlHelper.handleSetObjectAndRespond("INSERT INTO event SET ?", event, res);
});

router.post("/edit", (req, res) => {
    pool.query(
        "SELECT creator_id FROM event WHERE eventID = ?",
        req.body.eventId,
        function (error, results, fields) {
            if (error) {
                return res.json({
                    success: false,
                    message: error
                });
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

            sqlHelper.handleSetObjectAndRespond(
                "UPDATE event SET ? WHERE eventID = " + event.eventID,
                event,
                res
            );
        }
    );
});

router.post("/delete", (req, res) => {
    if (req.user != null) {
        const id = req.body.event_id;
        sqlHelper.handleDeleteAndRespond(
            "DELETE FROM event WHERE eventID = " + id,
            res
        );
    }
});

module.exports = router;
