var router = require("express").Router();
var pool = require("../db/database");

//Makes app accept JSON objects.
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.route("/").get(async (req, res, next) => {
  try {
    let userId = req.user.user_id;
    let usertype = pool.query("SELECT user_type FROM user_info WHERE user_id =" + userId + ";")
  
    if (usertype == "student"){
      //userinfo and advisor
      let advisorId = pool.query("SELECT advisor_id FROM student_info WHERE user_id =" + userId + ";")
      let advisorname = pool.query("SELECT first_name, last_name, campusEmail from user_info where user_id =" + advisorId + ";")
      let query = "SELECT first_name, last_name, campusEmail FROM schedulerdb.user_info WHERE user_id = " + userId + " ";
      let user_info = await pool.query(query)
      //classes
      query = "SELECT course_title, course_subject, course_number FROM class_info ci, classes_taken ct WHERE ci.CRN = ct.CRN AND ct.user_id = " + userId + ";"
      let course_info = await pool.query(query)
      res.json({user_info, course_info})
      //groups
      query="SELECT GROUP_CONCAT(g.group_name) AS Super_group FROM groups g, my_groups mg,user_info ui WHERE mg.user_id = " + userId + " AND mg.group_id = g.group_id;"
      let group_info = await pool.query(query)
      res.json({user_info, course_info, group_info});
    }
    else{
      let query = "SELECT first_name, last_name, campusEmail FROM schedulerdb.user_info WHERE user_id = " + userId + " ";
      let user_info = await pool.query(query)
      //classes
      query = "SELECT course_title, course_subject, course_number FROM class_info ci, classes_taken ct WHERE ci.CRN = ct.CRN AND ct.user_id = " + userId + ";"
      let course_info = await pool.query(query)
      //groups
      query="SELECT GROUP_CONCAT(g.group_name) AS Super_group FROM groups g, my_groups mg,user_info ui WHERE mg.user_id = " + userId + " AND mg.group_id = g.group_id;"
      let group_info = await pool.query(query)
      res.json({user_info, course_info, group_info});
    }
    
    
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});


module.exports = router;
