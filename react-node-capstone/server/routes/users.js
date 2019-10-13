var router = require("express").Router();
var pool = require("../db/database");
const passport = require("passport");

var bodyParser = require("body-parser");

var emailHelper = require("../email/emailHelper");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/login', function (req, res, next) {
  
    passport.authenticate('local', function (err, user, info) {
        if (err) return next("Authentication Failed.");
        if (!user) return next("Authentication failed. User with this email could not be found.")

        req.login(user, function (err) {
            if (err) return next("Authentication failed. Error logging in user.");
            
            return res.json({ "success": true, "message": "User has been logged in", "user": user });
        });
        

    })(req, res);
});

router.post("/register", function (req, res, next) {

    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        campusEmail: req.body.campusEmail,
        password: req.body.password,
        user_type: req.body.user_type,
        user_id: req.body.user_id
    };

    let student = {};

    if (user.user_type == "student") {
        student = {
            user_id: req.body.user_id,
            classification: req.body.classification,
            major: req.body.major,
            advisor_id: req.body.advisor_id
        };
    }

    pool.query("SELECT COUNT(*) AS count FROM schedulerdb.user_info WHERE campusEmail = ?", user.campusEmail, function (error, results, fields) {
        if (error) return next("Error connecting to the database.")
        try {
            if (results[0].count == 0) {
                pool.query("INSERT INTO schedulerdb.user_info SET ?", user, function (error, results, fields) {
                    if (error) return next("Error connecting to the database.")

                    if (user.user_type == "student") {

                        pool.query("INSERT INTO schedulerdb.student_info SET ?", student, function (error, results, fields) {
                            if (error) return next("Error connecting to the database.")

                            req.login(user, function (err) {
                                if (error) return next("User has been registered, but couldn't be logged in.")
                               
                                return res.json({ "success": true, "message": "User has been registered and logged in as " + user.campusEmail, "user": user });
                            });

                        });
                    } else {
                        req.login(user, function (err) {
                            if (error) return next("User has been registered, but couldn't be logged in.")
                            return res.json({ "success": true, "message": "User has been registered and logged in as " + user.campusEmail, "user": user });
                        });
                    }
                });
            } else {
                return next("User already exists in database")
            
            }
        } catch (err) {
            return next("Error while trying to register user")
        }

        
    });
});

router.get("/advisors", function (req, res, next) {

    pool.query("SELECT first_name, last_name, user_id FROM schedulerdb.user_info WHERE user_type = ?", "faculty", function (error, results, fields) {

        if (error) return next("Failed to connect to database")
        try {
            if (results.length > 0) {

                return res.json({ "success": true, "message": "Advisor data has been retrived.", "results": results });

            } else return next("Could not find any advisors")
        } catch (err) {
            res.json({ "success": false, "message": "Error while getting advisors. " + err });
        }
        
    });

})

router.post('/forgotPassword', function (req, res, next) {

    pool.query("SELECT campusEmail, user_id FROM schedulerdb.user_info WHERE campusEmail = ?", req.body.campusEmail, function (error, results, fields) {
        if (error) return next("Failed to connect to database")
        try {
            if (results.length > 0) {

                if (req.body.user_id == results[0].user_id) {
                    sendPasswordResetEmail(req.body.campusEmail, res);
                } else return next("Your campus Id was incorrect")
                

            } else return next("Email does not exist")
        } catch (err) {
            res.json({ "success": false, "message": "Error while handling request. Are you sure that the email exists in our database? " + err });
        }
        
    });

});
function sendPasswordResetEmail (email, res) {
    let subject = "Password Reset Email";
    let text = "Hi, Reset password will be implemented very soon. Stay tuned.";

    let callback = (error, info) => {
        if (error) {
            return res.json({ "success": false, "message": "Password reset email couldn't be sent. " + error })
        } else {
            return res.json({ "success": true, "message": "Password reset email sent. " + info.response })
        }
    };

    emailHelper.sendEmail(email, subject, text, callback);
}


module.exports = router;
