const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

const events = [
  {id: 1, eventDetails: 'ULM Football Game Aug 31 2019'},
  {id: 2, eventDetails: 'Labor Day Sept 2 2019'}
];

// create a GET route
app.get('/events', function(req, res, next){
  res.json(events);
});

//Post
app.post('/events', (req,res) => {
  const event = {
    id: events.length +1,
    eventDetails: req.body.eventDetails
  };
  events.push(event);
  res.send(event);
})