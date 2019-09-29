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
  let appointments = await pool.query("SELECT * FROM event WHERE event_type = 'appointment'");
  res.json(appointments);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
})

router.route("/").post((req,res) => {
    const appointments = {
      title: req.body.title,
      description : req.body.description,
      start: req.body.start,
      end: req.body.end,
      event_type: req.body.end,
      creator_id: req.body.creator_id,
      carousel: req.body.carousel
    };
    pool.query("INSERT INTO event SET ?", appointments, function(
      error,
      results,
      fields
    ){
      if (error) throw error;
      res.send(results);
    });
    
  })


module.exports = router;