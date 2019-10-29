var router = require("express").Router();
var pool = require("../db/database");
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.route("/").get(async (req, res, next) => {
  try {
    let userId = req.user.user_id;
    let usertype = await pool.query("SELECT user_type FROM user_info WHERE user_id =" + userId + ";")
    let check = usertype[0].user_type;
    
    if (check== "student"){
      //userinfo and advisor
      let advisorId = await pool.query("SELECT advisor_id FROM student_info WHERE user_id =" + userId + ";")
      advisorId = Number.parseInt(advisorId[0].advisor_id);

      
      let query = "SELECT ui.first_name, ui.last_name, ui.campusEmail, si.major, si.classification, u.first_name as advisor_first_name, u.last_name as advisor_last_name, u.campusEmail as advisor_campusEmail FROM user_info ui, student_info si, user_info u WHERE ui.user_id = " + userId + " AND si.user_id = " + userId + " AND u.user_id = " + advisorId + ";"
      let user_info = await pool.query(query)[0]
      //classes
      query = "SELECT course_title, course_subject, course_number FROM class_info ci, classes_taken ct WHERE ci.CRN = ct.CRN AND ct.user_id = " + userId + ";"
      let course_info = await pool.query(query)

      //groups
      query="SELECT GROUP_CONCAT(DISTINCT g.group_name) AS Super_group FROM groups g, my_groups mg,user_info ui WHERE mg.user_id = " + userId + " AND mg.group_id = g.group_id;"
      let group_info = await pool.query(query)
      group_info = group_info[0]? group_info[0].Super_group : "";
      group_info = group_info.split(",").filter((e)=>e.length > 0);
      res.json({user_info, course_info, group_info});
    }
    else{
      let query = "SELECT first_name, last_name, campusEmail FROM schedulerdb.user_info WHERE user_id = " + userId + " ";
      let user_info = await pool.query(query);
      user_info = user_info[0]
      //classes
      query = "SELECT course_title, course_subject, course_number FROM class_info ci, classes_taken ct WHERE ci.CRN = ct.CRN AND ct.user_id = " + userId + ";"
      let course_info = await pool.query(query)
      //groups
      query="SELECT GROUP_CONCAT(DISTINCT g.group_name) AS Super_group FROM groups g, my_groups mg,user_info ui WHERE mg.user_id = " + userId + " AND mg.group_id = g.group_id;"
      let group_info = await pool.query(query)
      group_info = group_info[0]? group_info[0].Super_group : "";
      group_info = group_info.split(",").filter((e)=>e.length > 0);
      
      res.json({user_info, course_info, group_info});
    }
    
    
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});


module.exports = router;
