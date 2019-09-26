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
  var startP = new Date(req.body.start);
  startP.setSeconds(0);
  var startHours = Number(startP.getHours());
  var startMin = Number(startP.getMinutes());

  var end = new Date(req.body.end);
  end.setSeconds(0);
  var endHours = Number(end.getHours());
  var endMin = Number(end.getMinutes());

  //Iterval of time slots
  const interval = Number(req.body.interval);

  //End Time Placeholder that moves with start time
  var endP = new Date(req.body.start);
  endP.setSeconds(0);
  var endHoursP = Number(endP.getHours());
  var endMinP = Number(endP.getMinutes());
  endP.setMinutes(endMinP+interval);
  endMinP= endMinP + interval;

  var done = false;
  while (!done) {

    console.log(startMin);
    console.log(endMinP);
    console.log(startP.toString());
    console.log(endP.toString());
    
    var advising = {
      start: startP,
      end: endP,
      advisor: req.body.advisor
    };

    

    pool.query("INSERT INTO advising_slots SET ?", advising, function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
    });

    if(endMinP==endMin && startHours == endHours){
      console.log("1");
      done = true;
    }
    else if(endMinP == 0){
      console.log("2");
      startMin = 0;
      startP.setMinutes(startMin);
      endMinP=interval;
      endP.setMinutes(endMinP);
      startHours++;
      startP.setHours(startHours);
    }
    else if(endMinP == (60 - interval)){
      console.log("3");
      startMin+=interval;
      startP.setMinutes(startMin);
      endMinP=0;
      endP.setMinutes(endMinP);
      endHoursP++;
      endP.setHours(endHoursP);
    }
    else if(startMin == (60 - interval)){
      console.log("4");
      startMin = 0;
      startP.setMinutes(startMin);
      endMinP=0;
      endP.setMinutes(endMinP);
      endHoursP++;
      endP.setHours(endHoursP);
    }
    else{
      console.log("5");
      startMin+=interval;
      startP.setMinutes(startMin);
      endMinP+=interval;
      endP.setMinutes(endMinP);
    }
    console.log("----------------");
  }
});
module.exports = router;
