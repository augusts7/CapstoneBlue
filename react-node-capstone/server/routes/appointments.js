var router = require("express").Router();

var sqlHandler = require("../handler/queryHandler");


var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("create", (req, res) => {

    const appointments = {
        event_type: "appointment",
        creator_id: req.user.user_id,
        carousel: req.body.carousel,
        creator_calendar_id: req.body.calendarId
    };

    pool.query("INSERT INTO schedulerdb.event SET ?", appointments, async function (error, results, fields) {

        if (error) {
            console.log(erorr);
            return;
        }
        if (results.length > 0) {

            let eventId = results.insertId;

            if (req.body.attendeeEmails) {

                await req.body.attendeeEmails.forEach(async (email) => {

                    await pool.query("SELECT user_id FROM schedulerdb.user_info WHERE campusEmail = ?", email, async function (error, results, fields) {

                        try {
                            if (!error && results.length > 0) {

                                let inviteData = {
                                    event_id: eventId,
                                    invited_user_id: results[0]
                                };

                                await pool.query("INSERT INTO schedulerdb.event_invite SET ?", inviteData);

                            }
                        } catch (err) {
                            return res.json({ "success": false, "message": err });
                        }

                    });

                });
            }
        }

        res.send(results);
    });
})


router.post("/attend/:calendarId", function (req, res) {

    const attendeeData = {
        event_id: req.body.eventId,
        attendee_id: req.user.user_id,
        calendar_id: req.params.calendarId
    };

    console.log(req.user.user_id);

    pool.query("INSERT INTO schedulerdb.attending SET ?", attendeeData, function (error, results, fields) {

        if (error) {
            return res.json({ "success": false, "message": "Failed to connect to database" });
        }
        try {
            if (results.length > 0) {

                pool.query("SELECT creator_id, creator_calendar_id FROM schedulerdb.event WHERE eventID = ?", attendeeData.event_id, function (error, results, fields) {

                    if (error) {
                        return res.json({ "success": false, "message": "Failed to connect to database" });
                    }
                    try {
                        if (results.length > 0) {

                            const creatorData = {
                                event_id: req.body.eventId,
                                attendee_id: results[0].creator_id,
                                calendar_id: result[0].creator_calendar_id
                            };

                            pool.query("INSERT INTO schedulerdb.attending SET ?", creatorData, function (error, results, fields) {

                                if (error) {
                                    return res.json({ "success": false, "message": "Failed to connect to database" });
                                }
                                try {
                                    if (results.length > 0) {

                                        return res.json({ "success": true, "message": "Success" });
                                    }
                                } catch (err) {
                                    return res.json({ "success": false, "message": err });
                                }

                            });

                        }
                    } catch (err) {
                        return res.json({ "success": false, "message": err });
                    }

                });

            }
        } catch (err) {
            return res.json({ "success": false, "message": err });
        }

    });

})


router.get("/all/:calendarId", function (req, res) {

    let select = "SELECT * FROM schedulerdb.event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id + " UNION DISTINCT SELECT * FROM schedulerdb.event INNER JOIN schedulerdb.attending ON event_id = eventID WHERE event_type = 'appointment' AND attendee_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM schedulerdb.event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId + " UNION DISTINCT SELECT * FROM schedulerdb.event INNER JOIN schedulerdb.attending ON event_id = eventID WHERE attendee_id = " + req.user.user_id + " AND calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})

router.get("/created/:calendarId", function (req, res) {

    let select = "SELECT * FROM schedulerdb.event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM schedulerdb.event WHERE event_type = 'appointment' AND creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})

router.get("/attending/:calendarId", function (req, res) {

    let select = "SELECT * FROM schedulerdb.event INNER JOIN schedulerdb.attending ON event_id = eventID WHERE event_type = 'appointment' AND attendee_id = " + req.user.user_id;

    if (req.params.calendarId != "main") {
        select = "SELECT * FROM schedulerdb.event INNER JOIN schedulerdb.attending ON event_id = eventID WHERE attendee_id = " + req.user.user_id + " AND calendar_id = " + req.params.calendarId;
    }

    sqlHandler.getAndSendResponseToClient(select, req, res);

})

router.get("/receivedInvite/:calendarId", function (req, res) {

    try {

        let select = "SELECT * FROM schedulerdb.event INNER JOIN schedulerdb.event_invite ON event_id = eventID WHERE attendee_id = " + req.user.user_id;

        if (req.params.calendarId != "main") {
            select = "SELECT * FROM schedulerdb.event INNER JOIN schedulerdb.event_invite ON event_id = eventID WHERE attendee_id = " + req.user.user_id + " AND calendar_id = " + req.params.calendarId;
        }

        sqlHandler.getAndSendResponseToClient(select, req, res);

    } catch (err) {

        return res.json({ "success": false, "message": "Server error. " + err });
    }
})


router.get("/sentInvite/:calendarId", function (req, res) {

    try {

        let select = "SELECT * FROM schedulerdb.event WHERE event_type = 'appointment' creator_id = " + req.user.user_id;

        if (req.params.calendarId != "main") {
            select = "SELECT * FROM schedulerdb.event WHERE event_type='appointment' creator_id = " + req.user.user_id + " AND creator_calendar_id = " + req.params.calendarId;
        }

        sqlHandler.getAndSendResponseToClient(select, req, res);

    } catch (err) {
        return res.json({ "success": false, "message": "Server error. " + err });
    }
})


module.exports = router;