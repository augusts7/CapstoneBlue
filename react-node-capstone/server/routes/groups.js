var router = require("express").Router();
var pool = require("../db/database");
var bodyParser = require("body-parser");
var sqlHandler = require("../utils/sql-helper/sql-helper");
const sqlHelper = require("../utils/sql-helper/sql-helper");
var emailhelper = require("../utils/email/email-sender");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Get Groups
router.route("/").get(async (req, res) => {
  try {
    let groups = await pool.query("SELECT * FROM groups");
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Get Specific group info
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

//Get all group Members
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

//Broken. Needs to pull only single-event-layout for that group.
//Get all group events
router.route("/groupEvents/:group_id").get(async (req, res) => {
  try {
    let groupid = req.params.group_id;
    let group_events = await pool.query(
      'SELECT eventID, title, description, start, end FROM event WHERE status="approved" AND group_id =' +
        groupid +
        ";"
    );
    res.json(group_events);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.route("/pendingGroupEvents/:group_id").get(async (req, res) => {
  try {
    let groupid = req.params.group_id;
    let group_events = await pool.query(
      'SELECT eventID, title, description, start, end FROM event WHERE status="pending" AND group_id =' +
        groupid +
        ";"
    );
    res.json(group_events);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Change a group's name
router.route("/editGroupName").post(async (req, res) => {
  try {
    let sql1 =
      "UPDATE groups SET group_name = '" +
      req.body.groupName +
      "' WHERE group_id = " +
      req.body.groupID +
      ";";
    pool.query(sql1, function(error, results, fields) {
      if (error) {
        return res.json({
          success: false,
          message: "Error while changing group name"
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Change a group's owner
router.route("/editGroupOwner").post(async (req, res) => {
  try {
    let sql1 =
      "UPDATE my_groups SET status = 'Member' WHERE group_id = " +
      req.body.groupID +
      ";";
    console.log(req.body.groupID);
    console.log(req.body.newOwnerID);
    pool.query(sql1, function(error, results, fields) {
      if (error) {
        return res.json({
          success: false,
          message: "Error while changing status"
        });
      }
      let sql2 =
        "UPDATE my_groups SET status = 'Owner' WHERE group_id = " +
        req.body.groupID +
        " AND user_id = " +
        req.body.newOwnerID +
        ";";
      pool.query(sql2, function(error, results, fields) {
        if (error) {
          return res.json({
            success: false,
            message: "Error while changing ownership"
          });
        }
        let sql3 =
          "UPDATE groups SET creator_id = " +
          req.body.newOwnerID +
          " WHERE group_id = " +
          req.body.groupID +
          ";";
        pool.query(sql3, function(error, results, fields) {
          if (error) {
            return res.json({
              success: false,
              message: "Error while changing creator_id"
            });
          }
        });
      });
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Create a group with moodle dump
router.route("/createGroups").post(async (req, res) => {
  try {
    const groups = {
      group_name: req.body.title,
      creator_id: req.user.user_id
    };
    let sql1 =
      "INSERT INTO groups (group_name, creator_id) VALUES ('" +
      groups.group_name +
      "', " +
      groups.creator_id +
      ");";
    pool.query(sql1, function(error, results, fields) {
      let group_id = results.insertId;
      if (error) {
        return res.json({
          success: false,
          message: "Error while creating the group"
        });
      }
      let sql2 =
        "INSERT INTO my_groups SELECT U.user_id, " +
        group_id +
        ", 'Member' FROM user_info U WHERE JSON_CONTAINS('" +
        JSON.stringify(req.body.data) +
        "', JSON_OBJECT('Email address', U.campusEmail));";
      pool.query(sql2, function(error, results, fields) {
        if (error) {
          return res.json({
            success: false,
            message: "Error while adding file members to group" //change later
          });
        }
        let sql3 =
          "INSERT INTO my_groups (user_id, group_id, status) VALUES (" +
          groups.creator_id +
          ", " +
          group_id +
          ", 'Owner');";
        pool.query(sql3, function(error, results, fields) {
          if (error) {
            return res.json({
              success: false,
              message: "Error while adding owner to group"
            });
          }
        });
      });
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Create a group with the user logged in
router.route("/").post(async (req, res) => {
  const groups = {
    group_name: req.body.group_name,
    creator_id: req.user.user_id
  };

  pool.query("INSERT INTO groups SET ?", groups, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;

    const my_groups = {
      user_id: req.user.user_id,
      group_id: results.insertId,
      status: "Owner"
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

//Delete a group
router.route("/delete/:group_id").delete(async (req, res) => {
  try {
    let group_id = req.params.group_id;
    let sql = "DELETE FROM my_groups WHERE group_id = " + group_id + ";";
    pool.query(sql, function(error, results, fields) {
      if (error) {
        return res.json({ success: false, message: error });
      }
      let sql2 = "DELETE FROM groups WHERE group_id = " + group_id + ";";
      pool.query(sql2, function(error, results, fields) {
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
//Delete a user from a group
router.route("/deleteUser/:user_id").delete((req, res) => {
  try {
    let user_id = req.params.user_id;
    let group_id = req.body.group_id;
    let sql =
      "DELETE FROM my_groups WHERE group_id = " +
      group_id +
      " AND user_id = " +
      user_id +
      ";";
    pool.query(sql, function(error, results, fields) {
      if (error) {
        return res.json({ success: false, message: error });
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Create a group event
router.route("/createEvents").post(async (req, res) => {
  try {
    let creator_id = req.user.user_id;
    let group_id = req.body.group_id;
    let status = await pool.query(
      "SELECT status FROM my_groups WHERE user_id =" +
        creator_id +
        " AND group_id = " +
        group_id +
        ";"
    );
    if (status[0].status == "Owner") {
      let newEvent = {
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        event_type: "group_event",
        creator_id: req.user.user_id,
        carousel: req.body.carousel,
        group_id: req.body.group_id,
        status: "approved"
      };
      pool.query("INSERT INTO event SET ?", newEvent, function(
        error,
        results,
        fields
      ) {
        if (error) throw error;
        res.send(results);
      });
    } else {
      let newEvent = {
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        event_type: "group_event",
        creator_id: req.user.user_id,
        carousel: req.body.carousel,
        group_id: req.body.group_id,
        status: "pending"
      };
      pool.query("INSERT INTO event SET ?", newEvent, function(
        error,
        results,
        fields
      ) {
        if (error) throw error;
        res.send(results);
      });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/requestEvents", (req, res) => {
  const event = {
    title: req.body.title,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    event_type: "group_event",
    creator_id: req.user.user_id,
    carousel: req.body.carousel,
    group_id: req.body.group_id,
    status: req.body.status
  };

  sqlHelper.handleSetObjectAndRespond("INSERT INTO event SET ?", event, res);
});
module.exports = router;
