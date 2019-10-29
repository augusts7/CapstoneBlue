var router = require("express").Router();
var pool = require("../db/database");
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.route("/").get(async (req, res, next) => {
  try {
    let results = await pool.query("SELECT * FROM classes_taken");
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Post
router.route("/").post((req, res) => {
    const classes_taken = {
      CRN: req.body.CRN,
      user_id: req.body.user_id
    };

    pool.query("INSERT INTO classes_taken SET ?", classes_taken, function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
      res.send(results);
    });
  });

module.exports = router;
