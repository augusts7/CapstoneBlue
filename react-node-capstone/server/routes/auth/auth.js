const router = require("express").Router();
const pool = require("../../db/database");
const passport = require("passport");
const bodyParser = require("body-parser");
const tokens = require("../../utils/tokens/tokens");
const sqlHelper = require("../../utils/sql-helper/sql-helper");
const expressFileUpload = require("express-fileupload");
const passwordResetHelper = require("../auth/reset-password-helper");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(expressFileUpload());

router.post('/Login', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next("Couldn't connect to the database. " + err);
        }
        if (!user) {
            return next("Authentication failed. User with this email could not be found.");
        }

        req.login(user, function (err) {
            if (err) {
                return next("Authentication failed. Error logging in user.");
            }
            user.token = tokens.encode(user.user_id);
            return res.json({"success": true, "message": "User has been logged in", "user": user});
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
                return res.json({"success": true, "user": results[0]});
            } else {
                return next("Couldn't silent Login");
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

    pool.query("SELECT COUNT(*) AS count FROM user_info WHERE campusEmail = ?", user.campusEmail, function (error, results, fields) {
        if (error) {
            return res.json({"success": false, "message": "Couldn't connect to the database. " + error});
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
                                if (err) {
                                    return next("Couldn't connect to the database. " + error);
                                }
                                user.token = tokens.encode(user.user_id);
                                return res.json({
                                    "success": true,
                                    "message": "User has been registered and logged in as " + user.campusEmail,
                                    "user": user
                                });
                            });

                        });
                    } else {
                        req.login(user, function (err) {
                            if (err) {
                                return next("User has been registered, but couldn't be logged in.");
                            }
                            user.token = tokens.encode(user.user_id);
                            return res.json({
                                "success": true,
                                "message": "User has been registered and logged in as " + user.campusEmail,
                                "user": user
                            });
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

router.post("/createUser", function (req, res, next) {

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

    pool.query("INSERT INTO user_info SET ?", user, function (error, results, fields) {
        if (error) {
            return next("Couldn't connect to the database. " + error);
        }

        if (user.user_type === "student") {

            sqlHelper.handleSetObjectAndRespond("INSERT INTO student_info SET ?", student, res);


        } else {
            return res.json({"success": false, "message": "User has been already been registered"});
        }
    });
});

router.post("/createMultipleUsers", async function (req, res, next) {

    const users = req.body.users;

    users.forEach(async (user) => {
        if (!user.hasOwnProperty("password")) {
            user.password = "CapstoneBlue";
        }
        if (!user.hasOwnProperty("user_type")) {
            user.user_type = "student";
        }
        console.log(user);
        await pool.query("INSERT INTO user_info SET ?", user, (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            console.log("Another user has been created " + results);
        });
    });

    return res.json({success: true});

});

router.post('/forgotPassword', function (req, res, next) {

    pool.query("SELECT campusEmail, user_id FROM user_info WHERE campusEmail = ?", req.body.campusEmail, function (error, results, fields) {
        if (error) {
            return res.json({"success": false, "message": "Couldn't connect to the database. " + error});
        }
        try {
            if (results.length > 0) {

                const idsAreEqual = ("" + req.body.user_id) === ("" + results[0].user_id);

                if (idsAreEqual) {
                    passwordResetHelper.sendPasswordResetEmail(req.body.campusEmail, res, next);
                } else {
                    return res.json({"success": false, "message": "Your campus Id was incorrect"});
                }


            } else {
                return next("Email does not exist");

            }
        } catch (err) {
            return next("Error while handling request. Are you sure that the email exists in our database? " + err);
        }

    });

});


router.get('/sendPasswordResetEmail', function (req, res, next) {

    pool.query("SELECT * FROM user_info WHERE user_id = ?", req.user.user_id, function (error, results, fields) {
        if (error) {
            return next("Couldn't connect to the database. " + error);
        }
        if (results.length > 0) {
            const user = results[0];
            passwordResetHelper.sendPasswordResetEmail(user, res, next);
        }
    });

});

router.get('/isResetPasswordTokenValid/:token', function (req, res, next) {

    const decodedToken = tokens.decodeTokenWithExpiration(req.params.token);

    const isValid = decodedToken !== null;

    res.json({success: true, results: {isValid}});
});

router.post('/resetPassword', function (req, res, next) {

    const token = req.body.token;
    const password = "" + req.body.password;

    if (password.length <= 0) {
        return res.json({success: false, message: "The minimum length of password is 5!"});
    }

    const campusEmail = tokens.decodeTokenWithExpiration(token);

    if (campusEmail === null) {
        return res.json({success: false, message: "Password reset token is not valid. Please try again!"});
    }

    console.log("RESET PASSWORD: => " + campusEmail);
    console.log(campusEmail);

    try {
        pool.query("SELECT * FROM user_info WHERE campusEmail = ?", campusEmail, async function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.json({success: false, message: "Couldn't connect to the database. " + error});
            }
            if (results.length > 0) {
                await pool.query("UPDATE user_info SET password = ? WHERE campusEmail = ?", [password, campusEmail], function (error, results, fields) {
                    return res.json({success: true, message: "Password updated"});
                });
            } else {
                return res.json({success: false, message: "Your account doesn't exists. Please try again later!"});
            }
        });
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;
