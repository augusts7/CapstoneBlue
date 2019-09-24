const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/database");


function initPassport(app, passport) { 

    const strategy = new LocalStrategy(
        { "username": "campusEmail" },
        async function (campusEmail, password, done) {

            await pool.query("SELECT campusEmail, password FROM ulmschedulerdb.user_info WHERE campusEmail = ?", campusEmail, function (error, results, fields) {
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
        done(null, user.cwid);
    });

    passport.deserializeUser(async function(id, done) {

        let sql = "SELECT * FROM ulmschedulerdb.user_info WHERE cwid=" + id;

        await pool.query(sql, function (error, results, fields) {
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