var pool = require("../../db/database");

function handleSelectAndRespond (sql, res) {

    pool.query(sql, function (error, results, fields) {

        if (error) {
            return res.json({ "success": false, "message": "Failed to connect to the database. " + error });
        }
		try {
			if (results.length > 0) {

				return res.json({ "success": true, "message": "data has been retrieved.", "results": results });

			} else {
				return res.json({ "success": true, "message": "Couldn't find any related data." });
			}
		} catch (err) {
			return res.json({ "success": false, "message": "Error while getting data. " + err });
		}

	});
}


function handleSetObjectAndRespond(insertSql, dataObject, res) {
    
	pool.query(insertSql, dataObject, function (error, results, fields) {

        if (error) {
            console.log(error);
			return res.json({ "success": false, "message": "Failed to connect to database. " + error });
        }

        return res.json({ "success": true });
	});

}

function handleDeleteAndRespond(deleteSql, res) {

	pool.query(deleteSql, function (error, results, fields) {

		if (error) {
			console.log(error);
			return res.json({ "success": false, "message": "Failed to connect to database. " + error });
		}

		return res.json({ "success": true });
	});

}


module.exports = {
	"handleSelectAndRespond": handleSelectAndRespond,
	"handleSetObjectAndRespond": handleSetObjectAndRespond,
	"handleDeleteAndRespond": handleDeleteAndRespond,
};