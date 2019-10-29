var router = require("express").Router();
var pool = require("../db/database");
var bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.route("/").get(async (req, res) => {
  try {
    let user_id = req.user.user_id;
    console.log(user_id);
    let my_groups = await pool.query(
      "SELECT my_groups.group_id , groups.group_name FROM my_groups,groups WHERE groups.group_id = my_groups.group_id AND user_id=" +
        user_id +
        ";"
    );
    console.log("check");
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
