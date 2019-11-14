var router = require("express").Router();
var pool = require("../db/database");
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.route("/all").get(async (req, res) => {
  try {
    let  class_info = await pool.query("SELECT * FROM class_info");
    res.json(class_info);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

router.route("/").post((req, res) => {
    let class_info = {
      CRN: req.body.CRN,
      course_title: req.body.course_title,
      course_subject: req.body.course_subject,
      course_number: req.body.course_number
    };

    pool.query("INSERT INTO class_info SET ?", class_info, function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
      res.send(results);
    });
  });

module.exports = router;