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
const eventRouter = require("./routes/event");
const usersRouter = require("./routes/user_info");
const appointmentRouter = require("./routes/appointments");
const advisingRouter = require("./routes/advising");
//const attendingRouter = require("./routes/attending")

//Connects Routes to there files.
app.use("/event", eventRouter);
app.use("/user_info", usersRouter);
app.use("/appointments", appointmentRouter);
app.use("/advising", advisingRouter);
//app.use("/attending", attendingRouter);

//Error Handler
app.use((err, req, res, next) => {
  res.status(400).json({ success: false, messsage: err || err.messsage });
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
