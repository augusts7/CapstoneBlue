var router = require("express").Router();
var pool = require("../db/database");
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
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
    res.json(my_groups);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.route("/").post(async (req, res) => {
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

router.post("/addMultipleUsers", async function(req, res, next) {
  const users = req.body.users;

  console.log(users);

  await users.forEach(async user => {
    console.log(2);
    if (!user.hasOwnProperty("user_id")) {
      console.log(3);
      if (user.hasOwnProperty("campusEmail")) {
        await pool.query(
          "SELECT user_id FROM user_info WHERE campusEmail = ?",
          user.campusEmail,
          async (error, results, fields) => {
            console.log(4);
            if (error) {
              console.log(error);
            }
            console.log(results);
            if (results.length > 0) {
              console.log(5);
              const user_id = results[0].user_id;
              const user_in_group = {
                user_id,
                group_id: req.body.group_id,
                status: "Member"
              };
              await pool.query(
                "INSERT INTO my_groups SET ?",
                user_in_group,
                () => {}
              );
            }
          }
        );
      }
    } else {
      console.log("Adding user using UId");
      const user_in_group = {
        user_id: user.user_id,
        group_id: req.body.group_id,
        status: "Member"
      };
      await pool.query(
        "INSERT INTO my_groups SET ?",
        user_in_group,
        (error, results, fields) => {
          if (error) {
            console.log(error);
          }
          console.log("User has been added using Uid " + results);
        }
      );
    }
  });

  console.log(1);

  return res.json({ success: true });
});

module.exports = router;
