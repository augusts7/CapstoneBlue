var router = require("express").Router();
var pool = require("../db/database");

//Makes app accept JSON objects.
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.route("/login").get(async (req, res, next) => {
  try {
    let results = await pool.query(
      "SELECT campusEmail,password FROM user_info"
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Post
router.route("/register").post((req, res) => {
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

  var getCWID =
    "SELECT COUNT(*) AS count FROM user_info WHERE cwid = " + user.cwid;

  var q1 = pool.query(getCWID, function(error, results, fields) {
    if (error) throw error;

    if (results[0].cwid > 0) {
      var q2 = pool.query("INSERT INTO user_info SET ?", user, function(
        error,
        results,
        fields
      ) {
        if (error) throw error;
      });
      res.send(user);
    } else {
      console.log(
        "User with cwid " + req.body.cwid + " already exist in database"
      );
    }
    res.send(user);
  });
});

module.exports = router;
