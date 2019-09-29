let router = require("express").Router();
let pool = require("../db/database");
let bodyParser = require("body-parser");
let { createSlots } = require('../utils/timeSlot');

router.use(bodyParser.json());
router.route("/").get(async (req, res, next) => {
try {
  let advising = await pool.query("SELECT * FROM events");
  res.json(advising);
} catch (e) {
  next("Error");
}
});

router.route("/").post(async (req, res) => {
let { title, description, start, end, interval, creator_id, event_type, carousel } = req.body;
let slots = createSlots({start, end, interval, creator_id, title, description, event_type, carousel});
let success = await slots.map(slots=> pool.query("INSERT INTO event SET ?", slot));
res.status(200)
    .send({ success, slots});
});

module.exports = router;