


var pool = require("../db/database");




function getAndSendDataToClient (sql, req, res) {

	console.log("getAndSendDataToClient called by : " + req.user.user_id);

    pool.query(sql, function (error, results, fields) {

        console.log("getAndSendDataToClient query callback by : " + req.user.user_id);

		if (error) return next("Failed to connect to the database")
		try {
			if (results.length > 0) {

                console.log(results);
				return res.json({ "success": true, "message": "Data has been retrieved.", "results": results });

			} else {
				return res.json({ "success": false, "message": "Couldn't find any related data." });
			}
		} catch (err) {
			return res.json({ "success": false, "message": "Error while getting data. " + err });
		}

	});

}

function setObjectAndSendResToClient(insertSql, dataObject, req, res) {

	pool.query(insertSql, dataObject, function (error, results, fields) {

		if (error) {
			return res.json({ "success": false, "message": "Failed to connect to database" });
		}
		try {
			if (results.length > 0) {

				console.log("Data inserted. Id = " + results.insertId);

				return res.json({ "success": true });

			} else {
				return res.json({ "success": false, "message": "Couldn't add data." });
			}
		} catch (err) {
			return res.json({ "success": false, "message": "Server error. " + err });
		}

	});

}



module.exports = {
	"getAndSendResToClient": getAndSendDataToClient,
	"getAndSend": getAndSendDataToClient,
	"setObjectAndSendResToClient": setObjectAndSendResToClient,
};