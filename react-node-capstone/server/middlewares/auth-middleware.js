


const authenticationMiddleware = function (req, res, next) {

    if (req.user != null && req.user.user_id != null) {
        next();
    } else {
        return res.json({"success": false, "message": "You need to be logged in to access these data"});
    }

};

module.exports = {
    "authMiddleware": authenticationMiddleware
};