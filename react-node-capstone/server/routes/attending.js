var router = require("express").Router();
var pool = require("../db/database");

//Makes app accept JSON objects.
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.route("/").get(async (req, res) => {
  try{
  let attending = await pool.query("SELECT * FROM attending");
  res.json(attending);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
})

router.route("/").post((req,res) => {
  pool.query("SELECT COUNT(*) AS count FROM attending", function(
    error,
    results,
    fields
  ){
    if (error) throw error;

    const attending = {
      //auto increment in database needed 
      event_id = req.body.event_id,
      attendee_id = req.body.attendee_id,
      group_id = req.body.group_id
    };
    pool.query("INSERT INTO attending SET ?", attending, function(
      error,
      results,
      fields
    ){
      if (error) throw error;
    });
    res.send(results);
  })
});

module.exports = router;