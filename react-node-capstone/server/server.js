const express = require("express"); //Imports express
const app = express(); //Intializes an express app
const port = process.env.PORT || 5000; //Creates a port varible to be used later in app.listen()

//Makes app accept JSON objects.
app.use(express.json());

//Routes
const eventsRouter = require("./routes/events");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

//Connects Routes to there files.
app.use("/events", eventsRouter);
//app.use("/login", loginRouter);
//app.use("/register", registerRouter);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
