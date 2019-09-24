var router = require("express").Router();
var pool = require("../db/database");

var bodyParser = require("body-parser");

var emailHelper = require("../email/EmailHelper");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/login', function (req, res) {

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.json({ "success": false, "message": "Authentication failed." });
        }
        if (!user) {
            return res.json({ "success": false, "message": 'Authentication failed' });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.json({ "success": false, "message": "Authentication faile" });
            }
            return res.send({ success: true, message: "Authentication succeeded" });
        });
    })(req, res, next);
});

router.post("/register", async function (req, res) {

    const user = {
        cwid: req.body.cwid,
        password: req.body.password,
        campusEmail: req.body.campusEmail,
        personalEmail: req.body.personalEmail,
        major: req.body.major,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        classification: req.body.classification,
        advisor: req.body.advisor,
        user_type: req.body.user_type
    };

    var getCWID = "SELECT COUNT(*) AS count FROM user_info WHERE cwid = " + user.cwid;

    await pool.query(getCWID, function (error, results, fields) {
        if (error) {
            return res.json({ "success": false, "message": "Error registering user with cwid " + req.bocy.cwid });
        }

        if (results.length == 0) {
            await pool.query("INSERT INTO user_info SET ?", user, function (error, results, fields) {
                if (error) {
                    return res.json({ "success": false, "message": "Error registering user with cwid " + req.body.cwid });
                }
                return res.json({ "success": true, "message": "User with cwid " + req.body.cwid + " has been registered" });
            });
        } else {
            return res.json({ "success": false, "message": "User with cwid " + req.body.cwid + " already exist in database" });
        }
    });
});

router.post('/forgotPassword', async function (req, res) {

    await pool.query("SELECT EMAIL FROM ulmschedulerdb.user_info WHERE EMAIL = ?", req.body.campusEmail, async function (error, results, fields) {
        if (error) {
            res.json({ "success": false, "message": "Failed to connect to database" });
        }
        if (data.length > 0) {

            await sendPasswordResetEmail(req.body.campusEmail, res);

        } else {
            res.json({ "success": false, "message": "Email does not exist" });
        }
    });

});

async function sendPasswordResetEmail (email, res) {
    let subject = "Password Reset Email";
    let text = "Hi, Reset password will be implemented very soon. Stay tuned.";

    let callback = (error, info) => {
        if (error) {
            return res.json({ "status": 204, "message": "Password reset email couldn't be sent." })
        } else {
            return res.json({ "status": 200, "message": "Password reset email sent. " + info.response })
        }
    };

    await emailHelper.sendEmail(email, subject, text, callback); 
}


module.exports = router;
