const router = require("express").Router();
const sqlHandler = require("../utils/sql-helper/sql-helper");
const pool = require("../db/database");
const bodyParser = require("body-parser");
const authMiddleware = require("../middlewares/auth-middleware").authMiddleware;
const emailUtils = require("../utils/email/email-utils");
const socket = require("../utils/socket/socket");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(authMiddleware);


router.post("/", (req, res, next) => {

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
            return next(error);
        }

        let eventId = results.insertId;

        if (req.body.attendeeEmails) {

            const emailList = req.body.attendeeEmails;

            emailList.forEach((email) => {

                pool.query("SELECT user_id FROM user_info WHERE campusEmail = ?", email, function (error, results, fields) {

                    if (error) {
                        return next(error);
                    }
                    const inviteData = {
                        event_id: eventId,
                        invited_user_id: results[0].user_id
                    };

                    console.log(inviteData);

                    appointment.eventID = eventId;
                    socket.broadcastToUser(inviteData.invited_user_id, "newEventInvite", appointment);

                    pool.query("INSERT INTO event_invite SET ?", inviteData, (err, results, fields) => {
                        if (err) {
                            return next(err);
                        }
                        return res.json({success: true});
                    });
                });

            });
        }
    });
});


router.post("/delete", (req, res, next) => {

    console.log("Delete appointment ");

    pool.query("DELETE FROM event WHERE eventID = ?", req.body.eventId, function (error, results, fields) {

        if (error) {
            return next(error);
        }

        return res.json({success: true});

    });


});


router.post("/attend", function (req, res, next) {

    const attendeeData = {
        event_id: req.body.eventId,
        attendee_id: req.user.user_id,
        calendar_id: null
    };

    pool.query("SELECT * FROM event WHERE eventID = ?", attendeeData.event_id, function (error, results, fields) {

        if (error) {
            return next(error);
        }

        const attendingEvent = results[0];

        const creatorData = {
            event_id: req.body.eventId,
            attendee_id: results[0].creator_id,
        };
        console.log("Creator data " + creatorData);

        socket.broadcastToUser(creatorData.attendee_id, "newAttendingEvent", attendingEvent);
        socket.broadcastToUser(attendeeData.attendee_id, "newAttendingEvent", attendingEvent);

        pool.query("INSERT INTO attending SET ?", attendeeData, function (error, results, fields) {

            if (error) {
                return next(error);
            }
            console.log("Inserted attending " + results);

            pool.query("DELETE FROM event_invite WHERE event_id = ?", req.body.eventId, function (error, results, fields) {
                if (error) {
                    return next(error);
                }
                console.log("Deleted " + results);

                pool.query("INSERT INTO attending SET ?", creatorData, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return next(error);
                    }
                    console.log("inserted creator");
                    return res.json({success: true});
                });
            });


        });

    });

});

router.get("/receivedInvite", function (req, res) {

    let select = "SELECT * FROM event INNER JOIN event_invite ON event_id = eventID WHERE invited_user_id = " + req.user.user_id;

    sqlHandler.handleSelectAndRespond(select, res);
});


module.exports = router;