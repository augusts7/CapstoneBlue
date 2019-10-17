var router = require("express").Router();
var pool = require("../db/database");

var sqlHandler = require("../handler/queryHandler");


var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get("/attending/:calendarId", function (req, res) {

    let select = "SELECT * FROM schedulerdb.attending INNER JOIN schedulerdb.event ON schedulerdb.event.eventID = schedulerdb.attending.event_id WHERE attendee_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM schedulerdb.attending INNER JOIN schedulerdb.event ON schedulerdb.event.eventID = schedulerdb.attending.event_id WHERE attendee_id = " + req.user.user_id + " AND calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})

router.get("/sharedCalendar/:sharedCalId", function (req, res) {

    let select = "SELECT * FROM shared_calendars WHERE shared_calendars.id = " + req.params.sharedCalId;

    pool.query(select, function (error, results, fields) {

        if (error) {
            return res.json({ success: false, "message": error });
        }

        let sharingUserId = results[0].sharedByUserId;

        let select = "SELECT * FROM event INNER JOIN attending ON eventID = event_id WHERE attendee_id = " + sharingUserId;

        console.log("shared calendar ");
        console.log(results);

        sqlHandler.getAndSendResponseToClient(select, req, res);
    });
})

router.route("/all").get(async (req, res) => {
    try {
      let  events = await pool.query("SELECT * FROM event");
      res.json(events);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  })

router.get("/created/:calendarId", function (req, res) {

    let select = "SELECT * FROM schedulerdb.event WHERE creator_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM schedulerdb.event WHERE creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})



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

    sqlHandler.setObjectAndSendResToClient("INSERT INTO event SET ?", event, req, res);
});

router.post("/edit", (req, res) => {

    pool.query("SELECT creator_id FROM event WHERE eventID = ?", req.body.eventId, function (error, results, fields) {

        if (error) {
            return res.json({ success: false, "message": error });
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

        sqlHandler.setObjectAndSendResToClient("UPDATE event SET ? WHERE eventID = " + event.eventID, event, req, res);
    });
});


router.post("/delete", (req, res) => {

    if (req.user != null) {

        const id = req.body.eventId;

        sqlHandler.setObjectAndSendResToClient("DELETE FROM event WHERE eventID = " + id, req, res);
    }
    
});



module.exports = router;
