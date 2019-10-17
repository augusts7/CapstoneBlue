var router = require("express").Router();

var sqlHandler = require("../handler/queryHandler");
var pool = require("../db/database");

var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/create", (req, res) => {

    const appointment = {
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        event_type: "appointment",
        creator_id: req.user.user_id,
        carousel: req.body.carousel || "1",
    };

    console.log("appointment ");


    pool.query("INSERT INTO event SET ?", appointment, function (error, results, fields) {

        if (error) {
            return res.json({ success: false, "message": error });
        }

        var eventId = results.insertId;

        if (req.body.attendeeEmails) {

            getEmailList(req.body.attendeeEmails).forEach((email) => {

                pool.query("SELECT user_id FROM user_info WHERE campusEmail = ?", email, function (error, results, fields) {

                    if (error) {
                        return res.json({ "success": false, "message": error });
                    }
                    if (results.length > 0) {

                        const inviteData = {
                            event_id: eventId,
                            invited_user_id: results[0].user_id
                        };

                        console.log(inviteData);

                        pool.query("INSERT INTO event_invite SET ?", inviteData, (err, results, fields) => {
                            if (err) {
                                return res.json({ "success": false, "message": err });
                            }
                            return res.json({ success: true });
                        });
                    } else {
                        return res.json({ "success": false, "message": err });
                    }
                });

            });
        }
    });
});

function getEmailList(emailString) {
    if (emailString == null || emailString.length == 0) {
        return [];
    }
    var emails = emailString.split(",");
    return emails;
}


router.post("/delete", (req, res) => {

    console.log("Delete appointment ");

    pool.query("SELECT creator_id FROM event WHERE eventID = ?", req.body.eventId, function (error, results, fields) {

        if (error) {
            return res.json({ success: false, "message": error });
        }

        let sql = "DELETE FROM attending WHERE event_id = ?";
        if (results[0].creator_id === req.user.user_id) {
            sql = "DELETE FROM event WHERE eventID = ?";
        }  

        pool.query(sql, req.body.eventId, function (error, results, fields) {

            if (error) {
                return res.json({ success: false, "message": error });
            }

            return res.json({ "success": true });

        });

    });

    
});


router.post("/attend/:calId", function (req, res) {

    const attendeeData = {
        event_id: req.body.eventId,
        attendee_id: req.user.user_id,
        calendar_id: req.params.calId === "main" ? null : req.params.calId
    };

    pool.query("INSERT INTO attending SET ?", attendeeData, function (error, results, fields) {

        if (error) {
            return res.json({ "success": false, "message": error});
        }
        pool.query("SELECT creator_id FROM event WHERE eventID = ?", attendeeData.event_id, function (error, results, fields) {

            if (error) {
                return res.json({ "success": false, "message": error });
            }

            const creatorData = {
                event_id: req.body.eventId,
                attendee_id: results[0].creator_id,
            };

            pool.query("INSERT INTO attending SET ?", creatorData, function (error, results, fields) {

                if (error) {
                    return res.json({ "success": false, "message": error });
                }
                try {
                    if (results.length > 0) {

                        return res.json({ "success": true, "message": "Success" });
                    }
                } catch (err) {
                    return res.json({ "success": false, "message": err });
                }

            });

        });

    });

});


router.get("/all/:calendarId", function (req, res) {

    console.log("Get appointment data");

    let select = "SELECT * FROM event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id + " UNION SELECT * FROM event INNER JOIN attending ON event_id = eventID WHERE event_type = 'appointment' AND attendee_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId + " UNION SELECT * FROM event INNER JOIN attending ON event_id = eventID WHERE attendee_id = " + req.user.user_id + " AND calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})

router.get("/created/:calendarId", function (req, res) {

    let select = "SELECT * FROM event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})

router.get("/attending/:calendarId", function (req, res) {

    let select = "SELECT * FROM event INNER JOIN attending ON event_id = eventID WHERE event_type = 'appointment' AND attendee_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM event INNER JOIN attending ON event_id = eventID WHERE attendee_id = " + req.user.user_id + " AND calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})

router.get("/receivedInvite/:calendarId", function (req, res) {


    let select = "SELECT * FROM event INNER JOIN event_invite ON event_id = eventID WHERE invited_user_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM event INNER JOIN event_invite ON event_id = eventID WHERE invited_user_id = " + req.user.user_id + " AND calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);
    
})


router.get("/sentInvite/:calendarId", function (req, res) {

    let select = "SELECT * FROM event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM event WHERE event_type='appointment' AND creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})


module.exports = router;