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
    pool.query("SELECT COUNT(*) AS count FROM user_info", function(
      error,
      results,
      fields
    ){
      if (error) throw error;
  
      const user_info = {
        //auto increment in database needed 
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
      });
      res.send(results);
    })
  });
router.post('/login', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err || !user) return next("Authentication failed.")
        req.login(user, function (err) { 
            if (err) return next("Authentication failed.");
            
            return res.send({ success: true, message: "Authentication succeeded", "user": user });
        });

})
})
router.post("/register", function (req, res) {

    const user = {
        username: req.body.cwid,
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

    pool.query("SELECT COUNT(*) AS count FROM ulmschedulerdb.user_info WHERE username = ?", user.username, function (error, results, fields) {
        if (error) {
            return res.json({ "success": false, "message": "Error registering user. Error: " + error });
        }

        if (results[0].count == 0) {
            pool.query("INSERT INTO ulmschedulerdb.user_info SET ?", user, function (error, results, fields) {
                if (error) {
                    return res.json({ "success": false, "message": "Error registering user. Error: " + error });
                }
                return res.json({ "success": true, "message": "User has been registered", "user": user  });
            });
        } else {
            return res.json({ "success": false, "message": "User already exists in database"});
        }
    });
});

router.post('/forgotPassword', function (req, res) {

    pool.query("SELECT campusEmail FROM ulmschedulerdb.user_info WHERE campusEmail = ?", req.body.campusEmail, function (error, results, fields) {
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
            return res.json({ "success": false, "message": "Password reset email couldn't be sent. Error: " + error })
        } else {
            return res.json({ "success": true, "message": "Password reset email sent. " + info.response })
        }
    };

    emailHelper.sendEmail(email, subject, text, callback); 
}


module.exports = router;
