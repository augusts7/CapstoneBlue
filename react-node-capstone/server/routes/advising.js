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
  var start = new Date(req.body.start);
  start.setSeconds(0);
  var startHours = Number(start.getHours());
  var startMin = Number(start.getMinutes());

  var end = new Date(req.body.end);
  end.setSeconds(0);
  var endHours = Number(end.getHours());
  var endMin = Number(end.getMinutes());

  //Iterval of time slots
  var interval = Number(req.body.interval);

  //End Time Placeholder that moves with start time
  var endP = end;
  endP.setMinutes(endMin+interval);
  var endHoursP = endHours;
  var endMinP = endMin;

  var done = false;
  while ( !done ) {

    const advising = {
      start: start,
      end: endP,
      advisor: req.body.advisor
    };

    console.log("Query Executed");
    console.log(startMin);
    console.log(endMin);
    console.log(start.toString());
    console.log(end.toString());

    pool.query("INSERT INTO advising_slots SET ?", advising, function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
    });

    if(endMinP==endMin && startHours == endHours){
      done = true;
    }
    else if(endMinP == 0){
      console.log("check");
      startMin = 0;
      start.setMinutes(startMin);
      endMinP=interval;
      endP.setMinutes(endMinP);
      startHours++;
      start.setHours(startHours);
    }
    else if(startMin == (60 - interval)){
      startMin = 0;
      start.setMinutes(startMin);
      endMinP=0;
      endP.setMinutes(endMinP);
      endHoursP++;
      endP.setHours(endHoursP);
    }
    else{
      startMin+=interval;
      start.setMinutes(startMin);
      endMinP+=interval;
      endP.setMinutes(endMinP);
    }
  }
});
module.exports = router;
