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
// passportHelper.initPassport(app, passport);

// Passport has to be added to these routes so that user is logged in 
// For example
//app.get('/api/users/me',
//    passport.authenticate('basic', { session: false }),
//    function (req, res) {
//        res.json({ id: req.user.id, username: req.user.username });
//    });

//Routes
const eventsRouter = require("./routes/events");
const usersRouter = require("./routes/users");
const appointmentRouter = require("./routes/appointments");
const advisingRouter = require("./routes/advising");

//Connects Routes to there files.
app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/appointments", appointmentRouter);
app.use("/advising", advisingRouter);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
