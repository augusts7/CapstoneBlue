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
    let groups = await pool.query("SELECT * FROM groups");
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

router.route("/").post((req, res) => {
  const groups = {
    group_name: req.body.group_name,
    creator_id: req.body.creator_id
  };

  pool.query("INSERT INTO groups SET ?", groups, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    const my_groups = {
      user_id: req.body.creator_id,
      group_id: results.insertId
    }
    pool.query("INSERT INTO my_groups SET ?", my_groups, function(
      error,results,fields
    ){
      if (error) throw error;
      res.send(results)
    })
    res.send(results);
  });
});

module.exports = router;
