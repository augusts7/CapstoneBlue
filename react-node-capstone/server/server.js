const express = require("express"); //Imports express
const app = express(); //Intializes an express app
const port = process.env.PORT || 5000; //Creates a port varible to be used later in app.listen()

const expressSession = require("express-session");
const passport = require("passport");

const session = {
  secret: "LoxodontaElephasMammuthusPalaeoloxodonPrimelephas",
  cookie: {},
  resave: false,
  saveUninitialized: false
};


if (app.get("env") === "production") {
  session.cookie.secure = true; // Serve secure cookies, requires HTTPS
}


app.use(expressSession(session));


const passportHelper = require("./auth/passport");
passportHelper.initPassport(app);

//Routes
const eventRouter = require("./routes/events");
const usersRouter = require("./routes/users");
const appointmentRouter = require("./routes/appointments");
const advisingRouter = require("./routes/advising");
const attendingRouter = require("./routes/attending")
const groupsRouter = require("./routes/groups")
const mygroupsRouter = require("./routes/my_groups")
const classinfoRouter = require("./routes/class_info")
const classestakesRouter = require("./routes/classes_taken")

//Connects Routes to there files.
app.use("/events", eventRouter);
app.use("/users", usersRouter);
app.use("/appointments", appointmentRouter);
app.use("/advising", advisingRouter);
app.use("/attending", attendingRouter);
app.use("/groups", groupsRouter);
app.use("./my_groups", mygroupsRouter);
app.use("./class_info", classinfoRouter);
app.use("./classes_taken", classestakesRouter);

//Error Handler
app.use((err, req, res, next) => {
    console.error(err);

  res.status(400).json({ success: false, messsage: err || err.messsage || "Application error"});
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
