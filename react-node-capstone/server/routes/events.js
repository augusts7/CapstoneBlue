var router = require("express").Router();

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


module.exports = router;
