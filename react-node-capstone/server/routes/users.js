var router = require("express").Router();
var pool = require("../db/database");

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

router.route("/register").get(async (req, res, next) => {
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
  const {
    cwid,
    password,
    password2,
    campusEmail,
    personalEmail,
    major,
    first_name,
    last_name,
    classification,
    advisor,
    user_type
  } = req.body;

  let errors = [];

  //Check required fields
  if (
    !cwid ||
    !password ||
    !password2 ||
    !campusEmail ||
    !personalEmail ||
    !major ||
    !first_name ||
    !last_name ||
    !classification ||
    !advisor ||
    !user_type
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check if passwords match.
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //Check if password satisfies the minimum length.
  if (password.length < 7) {
    errors.push({ msg: "Password must be at least 8 characters" });
  }

  if (errors.length > 0) {
    res.render("register");
  } else {
    res.send("pass");
  }
});

module.exports = router;
