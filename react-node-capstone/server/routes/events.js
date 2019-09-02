const express = require('express');
const mysql = require('mysql');
const db = require('../db/events');

const router = express.Router();

var connection = mysql.createConnection({
    host: 'event-scheduler-db.cfuzjkgst1bk.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'CapstoneBlue',
    database: 'eventschedulerdb'
  })
  
connection.connect();

router.get('/', async(req, res, next) => {
    try{
        let results = await db.all();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Post
router.post('/', (req,res) => {

    var q1 = connection.query('SELECT COUNT(*) AS count FROM Events', function (error, results, fields){

        if (error) throw error;

        const event = {
            eventID: results[0].count + 1,
            eventDetails: req.body.eventDetails
        };
    
        var q2 = connection.query('INSERT INTO Events SET ?', event, function (error, results, fields) {
            if (error) throw error;
        });

        res.send(event);
    });
})

module.exports = router;