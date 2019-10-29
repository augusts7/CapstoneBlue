var router = require("express").Router();
var pool = require("../db/database");
var bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.route("/all").get(async (req, res) => {
  try {
    let  my_groups = await pool.query("SELECT * FROM my_groups");
    res.json(my_groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

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
