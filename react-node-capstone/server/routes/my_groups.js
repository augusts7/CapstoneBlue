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
        console.log("Please restart Server");
        res.sendStatus(500);
    }
});

router.route("/").post((req, res) => {
    const my_groups = {
        group_id: res.insertId,
        user_id: req.body.user_id
    };

    pool.query("INSERT INTO my_groups SET ?", my_groups, function (
        error,
        results,
        fields
    ) {
        if (error) throw error;
        res.send(results);
    });
});

router.post("/addMultipleUsers", async function (req, res, next) {

    const users = req.body.users;

    let promises = [];
    users.forEach(function (user) {
        promises.push(addUserToGroup(user));
    });

    function addUserToGroup(user) {
        if (!user.hasOwnProperty("user_id")) {
            if (user.hasOwnProperty("campusEmail")) {
                pool.query("SELECT user_id FROM user_info WHERE campusEmail = ?", user.campusEmail, (error, results, fields) => {
                    if (results.length > 0) {
                        const user_id = results[0].user_id;
                        const user_in_group = {user_id, group_id: req.body.group_id};
                        pool.query("INSERT INTO my_groups SET ?", user_in_group, () => {});
                    }
                });
            }
        } else {
            const user_in_group = {user_id: user.user_id, group_id: req.body.group_id};
            pool.query("INSERT INTO my_groups SET ?", user_in_group, () => {});
        }
    }

    Promise.all(promises).then(() => {
        return res.json({success: true});
    });

});


module.exports = router;
