const router = require("express").Router();
const pool = require("../db/database");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get("/", (req, res, next) => {

    let sql = "SELECT * FROM classes_taken as ct INNER JOIN class_info as ci ON ct.CRN = ci.CRN WHERE ct.user_id = " + req.user.user_id;

    pool.query(sql, (error, results, fields) => {
        if (error) {
            return next(error);
        }

        return res.json({success: true, results: results});
    });


});

router.post("/", (req, res, next) => {

    const classes_taken = {
        CRN: req.body.CRN,
        user_id: req.body.user_id
    };

    pool.query("INSERT INTO classes_taken SET ?", classes_taken, () => {
        return res.json({success: true});
    });

});

router.post("/delete", (req, res, next) => {

    const info = {
        id: req.body.id,
    };

    pool.query("DELETE FROM classes_taken WHERE id = " + info.id, () => {
        return res.json({success: true});
    });

});


module.exports = router;
