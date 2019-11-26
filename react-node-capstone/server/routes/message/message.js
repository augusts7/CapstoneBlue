const router = require("express").Router();
const sqlHandler = require("../../utils/sql-helper/sql-helper");
const pool = require("../../db/database");
const bodyParser = require("body-parser");
const authMiddleware = require("../../middlewares/auth-middleware").authMiddleware;
const emailUtils = require("../../utils/email/email-utils");
const socket = require("../../utils/socket/socket");
const messageHelper = require("./group-message-helper");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(authMiddleware);


router.post("/sendGroupMessage", function (req, res, next) {

    const groupId = req.body.group_id;

    pool.query("SELECT group_name from groups WHERE group_id = " + groupId, (error, results, fields) => {
        let select = "SELECT campusEmail, first_name, last_name FROM my_groups join user_info ON user_info.user_id = my_groups.user_id WHERE my_groups.group_id = " + groupId;
        const groupName = results[0].group_name;
        pool.query(select, (error, results, fields) => {
            if (error) {
                return next(error);
            }
            const message = {
                message: req.body.message,
                sentBy: req.user.first_name + " " + req.user.last_name,
                date: req.body.date,
                groupName
            };
            messageHelper.sendGroupMessage(results, message, res, next);
        });
    });

});


module.exports = router;