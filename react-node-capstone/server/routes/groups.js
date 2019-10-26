var router = require("express").Router();
var pool = require("../db/database");

//Makes app accept JSON objects.
var bodyParser = require("body-parser");
var sqlHandler = require("../utils/sql-helper/sql-helper");
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
});

router.route("/groupInfo/:group_id").get(async (req, res) => {
  try {
    let groupid = req.params.group_id;
    let group_info = await pool.query(
      "SELECT * FROM groups WHERE group_id =" + groupid + ";"
    );
    res.json(group_info);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.route("/groupMembers/:group_id").get(async (req, res) => {
  try {
    let groupid = req.params.group_id;
    let group_members = await pool.query(
      "SELECT ui.user_id, ui.first_name, ui.last_name, ui.campusEmail, mg.status FROM user_info ui INNER JOIN  my_groups mg on ui.user_id = mg.user_id where mg.group_id = " +
        groupid +
        ";"
    );
    res.json(group_members);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.route("/groupEvents/:group_id").get(async (req, res) => {
  try {
    let groupid = req.params.group_id;
    let group_events = await pool.query(
      "SELECT e.eventID, e.title, e.description, e.start, e.end FROM event e inner join groups g on e.creator_id = g.creator_id where g.group_id =" +
        groupid +
        ' and e.event_type = "group_event";'
    );
    res.json(group_events);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
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
    };
    pool.query("INSERT INTO my_groups SET ?", my_groups, function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
      res.send(results);
    });
    res.send(results);
  });
});

router.route("/delete/:group_id").delete(async (req, res) => {
  try {
    let group_id = req.params.group_id;
    pool.query("DELETE FROM my_groups WHERE group_id = ?", group_id, function(
      error,
      results,
      fields
    ) {
      if (error) {
        return res.json({ success: false, message: error });
      }
      let sql = "DELETE FROM groups WHERE group_id = " + group_id + ";";
      pool.query(sql, function(error, results, fields) {
        if (error) {
          return res.json({
            success: false,
            message: "Error while deleting the group"
          });
        } else {
          return res.json({
            success: true,
            message: "Your group has been deleted"
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
