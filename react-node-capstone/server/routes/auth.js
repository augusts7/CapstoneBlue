var router = require("express").Router();
var pool = require("../db/database");
const passport = require("passport");
var bodyParser = require("body-parser");
var emailHelper = require("../email/emailHelper");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', function (req, res, next) {
  
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next("Couldn't connect to the database. " + err );
        }
        if (!user) {
            return next("Authentication failed. User with this email could not be found.");
        }

        req.login(user, function (err) {
            if (err) {
                return next("Authentication failed. Error logging in user.");
            }
            
            return res.json({ "success": true, "message": "User has been logged in", "user": user });
        });
        

    })(req, res);
});

router.get('/silentLogin', function (req, res, next) {

    if (req.user != null && req.user.user_id != null) {
        pool.query("SELECT * FROM user_info WHERE user_id = ?", req.user.user_id, function (error, results, fields) {
            if (error) {
                return next("Couldn't connect to the database. " + error);
            }
            console.log("should be logged in");
            console.log(results);
            if (results.length > 0) {
                return res.json({ "success": true, "user": results[0] });
            } else {
                return next("Couldn't silent login");
            }


        });
    }
});

router.get('/logout', function (req, res, next) {

    req.logout();
    res.json({"success": true, "message": "User has been logged out"});
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

    if (user.user_type === "student") {
        student = {
            user_id: req.body.user_id,
            classification: req.body.classification,
            major: req.body.major,
            advisor_id: req.body.advisor_id
        };
    }

    pool.query("SELECT COUNT(*) AS count FROM ser_info WHERE campusEmail = ?", user.campusEmail, function (error, results, fields) {
        if (error) {
            return res.json({ "success": false, "message": "Couldn't connect to the database. " + error });
        }
        try {
            if (results[0].count === 0) {
                pool.query("INSERT INTO user_info SET ?", user, function (error, results, fields) {
                    if (error) {
                        return next("Couldn't connect to the database. " + error);
                    }

                    if (user.user_type === "student") {

                        pool.query("INSERT INTO student_info SET ?", student, function (error, results, fields) {
                            if (error) {
                                return next("Couldn't connect to the database. " + error);
                            }

                            req.login(user, function (err) {
                                if (error) {
                                    return next("Couldn't connect to the database. " + error);
                                }
                               
                                return res.json({ "success": true, "message": "User has been registered and logged in as " + user.campusEmail, "user": user });
                            });

                        });
                    } else {
                        req.login(user, function (err) {
                            if (error) {
                                return next("User has been registered, but couldn't be logged in.");
                            } 
                            return res.json({ "success": true, "message": "User has been registered and logged in as " + user.campusEmail, "user": user });
                        });
                    }
                });
            } else {
                return next("User already exists in database");
            
            }
        } catch (err) {
            return next("Error while trying to register user");
        }

        
    });
});


router.post('/forgotPassword', function (req, res, next) {

    pool.query("SELECT campusEmail, user_id FROM user_info WHERE campusEmail = ?", req.body.campusEmail, function (error, results, fields) {
        if (error) {
            return res.json({ "success": false, "message": "Couldn't connect to the database. " + error });
        }
        try {
            if (results.length > 0) {

                const idsAreEqual = ("" + req.body.user_id) === ("" + results[0].user_id);

                if (idsAreEqual) {
                    sendPasswordResetEmail(req.body.campusEmail, res, next);
                } else {
                    return res.json({ "success": false, "message": "Your campus Id was incorrect" });
                }
                

            } else {
                return next("Email does not exist");

            }
        } catch (err) {
            return next("Error while handling request. Are you sure that the email exists in our database? " + err);
        }
        
    });

});
function sendPasswordResetEmail (email, res, next) {
    let subject = "Password Reset Email";
    let text = "Hi, Reset password will be implemented very soon. Stay tuned.";

    let callback = (error, info) => {
        if (error) {
            return next("Password reset email couldn't be sent. " + error);
        } else {
            return res.json({ "success": true, "message": "Password reset email sent. " + info.response })
        }
    };

    emailHelper.sendEmail(email, subject, text, callback);
}


module.exports = router;
