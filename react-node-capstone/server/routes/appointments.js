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
  let appointments = await pool.query("SELECT * FROM appointments");
  res.json(appointments);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
})

router.route("/").post((req,res) => {
  pool.query("SELECT COUNT(*) AS count FROM appointments", function(
    error,
    results,
    fields
  ){
    if (error) throw error;

    const appointments = {
      //auto increment in database needed 
      apptID: results[0].count + 1,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      apptAdviser: req.body.apptAdviser,
      apptCreator: req.body.apptCreator
    };
    pool.query("INSERT INTO appointments SET ?", appointments, function(
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