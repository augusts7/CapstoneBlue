var router = require("express").Router();
var pool = require("../db/database");

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
  var q1 = pool.query("SELECT COUNT(*) AS count FROM Events", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;

    const event = {
      eventID: results[0].count + 1,
      eventDetails: req.body.eventDetails
    };

    var q2 = pool.query("INSERT INTO Events SET ?", event, function(
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
