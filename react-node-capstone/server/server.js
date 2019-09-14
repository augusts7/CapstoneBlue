const express = require("express");
const apiRouter = require("./routes/events");
const app = express();
const port = process.env.PORT || 5000;
//var mysql = require('mysql');

app.use(express.json());

app.use("/api/events", apiRouter);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
