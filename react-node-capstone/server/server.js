const express = require("express"); //Imports express
const app = express(); //Intializes an express app
const port = process.env.PORT || 5000; //Creates a port varible to be used later in app.listen()

//Routes
const eventsRouter = require("./routes/events");
const usersRouter = require("./routes/users");

<<<<<<< HEAD
//Connects Routes to there files.
app.use("/events", eventsRouter);
app.use("/users", usersRouter);
=======
app.use("/api/events", apiRouter);
>>>>>>> master

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
