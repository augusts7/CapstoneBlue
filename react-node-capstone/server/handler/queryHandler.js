


var pool = require("../db/database");




function getAndSendDataToClient (sql, req, res) {

    pool.query(sql, function (error, results, fields) {

        if (error) {
            return res.json({ "success": false, "message": "Failed to connect to the database. " + error });
        }
		try {
			if (results.length > 0) {

				return res.json({ "success": true, "message": "Data has been retrieved.", "results": results });

			} else {
				return res.json({ "success": true, "message": "Couldn't find any related data." });
			}
		} catch (err) {
			return res.json({ "success": false, "message": "Error while getting data. " + err });
		}

	});
}


function setObjectAndSendResToClient(insertSql, dataObject, req, res) {
    
	pool.query(insertSql, dataObject, function (error, results, fields) {

        if (error) {
            console.log(error);
			return res.json({ "success": false, "message": "Failed to connect to database. " + error });
        }

        return res.json({ "success": true });
	});

}



module.exports = {
    "getAndSendResponseToClient": getAndSendDataToClient,
    "getAndSendResToClient": getAndSendDataToClient,
	"getAndSend": getAndSendDataToClient,
	"setObjectAndSendResToClient": setObjectAndSendResToClient,
};