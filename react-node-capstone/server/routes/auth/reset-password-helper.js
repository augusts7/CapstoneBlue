const tokens = require("../../utils/tokens/tokens");
const HOST_IP_ADDRESS = "localhost";
const emailHelper = require("../../utils/email/email-sender");


function getHtmlEmail (link) {

    let greeting = "Hi " + name;

    let description = ",\n\nTo reset your password please follow this link:\n\n";

    let linkHtml = link;

    let ending = "\n\nSincerely,\nULM Scheduling application team";

}


function sendPasswordResetEmail(user, res, next) {

    console.log("START Sending email");
    console.log(user);

    const token = tokens.encodeWithExpiration(user.campusEmail, '1h');

    console.log("TOKEN => " + token);

    let subject = "Password Reset Email";
    const name = user.first_name + " " + user.last_name;
    const link = HOST_IP_ADDRESS + ":3000/resetPassword/" + token;

    let text = "Hi " + name + ",\n\nTo reset your password please follow this link:\n\n" + link + "\n\nSincerely,\nULM Scheduling application team";

    let callback = (error, info) => {
        if (error) {
            return next("Password reset email couldn't be sent. " + error);
        } else {
            return res.json({"success": true, "message": "Password reset email sent. " + info.response})
        }
    };

    emailHelper.sendEmail(user.campusEmail, subject, text, callback);
}

exports = {
    sendPasswordResetEmail,
};