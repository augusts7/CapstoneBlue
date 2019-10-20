var router = require("express").Router();
var pool = require("../db/database");

//Makes app accept JSON objects.
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.route("/:group_id").get(async (req, res) => {
  try {
    let groupid = req.params.group_id;
    let my_groups = await pool.query(
      "SELECT * FROM my_groups WHERE group_id =" + groupid + ";"
    );
    res.json(my_groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.route("/").post((req, res) => {
  const my_groups = {
    group_id: res.insertId,
    user_id: req.body.user_id
  };

  pool.query("INSERT INTO my_groups SET ?", my_groups, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
