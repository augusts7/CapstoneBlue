const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
const pool = require("../db/database");
const passport = require("passport");


function initPassport(app) {

    const strategy = new LocalStrategy(
        { "usernameField": "campusEmail", "session": true },
        function (campusEmail, password, done) {

            pool.query("SELECT * FROM user_info WHERE campusEmail = ?", campusEmail, function (error, results, fields) {
                if (error) {
                    return done("Error while connecting to the database. " + error, false);
                }
                if (results.length > 0) {
                    const user = results[0];
                    if (user.password == password) {
                        return done(null, user);
                    } else {
                      return done("Passwords don't match.", false);
                    }
                } else {
                    return done("Can't find any user with that email. Are you sure that the email is correct?", false);
                }
            });
        });

    passport.use(strategy);
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser(function(id, done) {
        pool.query("SELECT * FROM schedulerdb.user_info WHERE user_id = ?", id,  function (error, results, fields) {
            if (error) {
                return done("Couldn't connect to the database. " + error, false);
            }
            if (results.length > 0) {
                return done(null, results[0]);
            } else {
                return done("Couldn't find any user with given username.", false);
            }
        });
    });
}

module.exports = {
    "initPassport": initPassport
};
