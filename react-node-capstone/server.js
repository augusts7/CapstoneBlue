const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/events', function(req, res, next){
  res.json([
    { id: 1, eventDetails: "Football Aug 31"},
    { id: 2, eventDetails: "Labor Day Sept 2"}
  ]);
});