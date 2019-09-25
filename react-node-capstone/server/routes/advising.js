var router = require("express").Router();
var pool = require("../db/database");

//Makes app accept JSON objects.
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.route("/").get(async (req, res) => {
  try {
    let advising = await pool.query("SELECT * FROM advising_slots");
    res.json(advising);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.route("/").post((req, res) => {
  const advising = {
    start: req.body.start,
    end: req.body.end,
    advisor: req.body.advisor
  };
  pool.query("INSERT INTO advising_slots SET ?", advising, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});
module.exports = router;
