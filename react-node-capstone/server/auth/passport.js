const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
const pool = require("../db/database");
const passport = require("passport");


function initPassport(app) { 

    const strategy = new LocalStrategy(
        { "usernameField": "campusEmail" },
        function (campusEmail, password, done) {

            pool.query("SELECT * FROM ulmschedulerdb.user_info WHERE campusEmail = ?", campusEmail, function (error, results, fields) {
                if (error) {
                    return done(null, false);
                }
                if (results.length > 0) { 
                    const user = results[0];
                    if (user.password == password) {
                        return done(null, user); 
                    }
                } else {
                    return done(null, false);
                }
            });
        });

    passport.use(strategy);
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {

        pool.query("SELECT * FROM ulmschedulerdb.user_info WHERE username = ?", username,  function (error, results, fields) {
            if (error) {
                return done(null, false);
            }
            if (results.length > 0) {
                return done(null, results[0]);
            } else {
                return done(null, false);
            }
        });
    });
}

module.exports = {
    "initPassport": initPassport
};