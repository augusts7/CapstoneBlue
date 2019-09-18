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
    let results = await pool.query("SELECT * FROM events");
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Post
router.route("/").post((req, res) => {
  var q1 = pool.query("SELECT COUNT(*) AS count FROM events", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;

    const event = {
      eventID: results[0].count + 1,
      eventStart: req.body.eventStart,
      eventEnd: req.body.eventEnd,
      eventTitle: req.body.eventTitle,
      eventDescription: req.body.eventDescription,
      eventType: req.body.eventType,
      eventCreator: req.body.eventCreator,
      carousel: req.body.carousel
    };

    var q2 = pool.query("INSERT INTO events SET ?", event, function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
    });

    res.send(event);
  });
});

module.exports = router;
