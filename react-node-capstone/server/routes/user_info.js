var router = require("express").Router();
var pool = require("../db/database");
const passport = require("passport");

var bodyParser = require("body-parser");

var emailHelper = require("../email/emailHelper");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route("/").get(async (req, res) => {
    try{
    let user_info = await pool.query("SELECT * FROM user_info");
    res.json(user_info);
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  })
  
  router.route("/").post((req,res) => {
  
      const user_info = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        campusEmail: req.body.campusEmail,
        password: req.body.password,
        user_type: req.body.user_type
      };
      
      pool.query("INSERT INTO user_info SET ?", user_info, function(
        error,
        results,
        fields
      ){
        if (error) throw error;
        if (user_info.user_type == "student"){
            const student_info ={
                user_id: results.insertId,
                classification: req.body.classification,
                major: req.body.major,
                advisor_id: req.body.advisor_id
            }
            pool.query("INSERT INTO student_info SET ?", student_info, function(
                error,
                results,
                fields
            ){
                if (error) throw error
                res.send(results);
            })
        }
        else{
        res.send(results);}
      });
      
    })
router.post('/login', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.json({ "success": false, "message": "Authentication failed. " + err
            });
        }
        if (!user) {
            return res.json({ "success": false, "message": "Authentication failed. User with this email couldn't be found." });
        }
        return res.json({ "success": true, "message": "User has been logged in", "user": user });

    })(req, res);
});


router.post("/register", function (req, res) {

    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        campusEmail: req.body.campusEmail,
        password: req.body.password,
        user_type: req.body.user_type
    };

    pool.query("SELECT COUNT(*) AS count FROM schedulerdb.user_info WHERE campusEmail = ?", user.campusEmail, function (error, results, fields) {
        if (error) {
            return res.json({ "success": false, "message": "Error registering user. " + error });
        }

        if (results[0].count == 0) {
            pool.query("INSERT INTO schedulerdb.user_info SET ?", user, function (error, results, fields) {
                if (error) {
                    return res.json({ "success": false, "message": "Error registering user. " + error });
                }
                req.login(user, function (err) {
                    if (err) {
                        return res.json({ "success": false, "message": "User has been registered, but couldn't be logged in."  });
                    }
                    return res.json({ "success": true, "message": "User has been registered and logged in as " + user.campusEmail, "user": user  });
                });

            });
        } else {
            return res.json({ "success": false, "message": "User already exists in database"});
        }
    });
});

router.post('/forgotPassword', function (req, res) {

    pool.query("SELECT campusEmail FROM schedulerdb.user_info WHERE campusEmail = ?", req.body.campusEmail, function (error, results, fields) {
        if (error) {
            res.json({ "success": false, "message": "Failed to connect to database" });
        }
        if (data.length > 0) {

            sendPasswordResetEmail(req.body.campusEmail, res);

        } else {
            res.json({ "success": false, "message": "Email does not exist" });
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
