const tokens = require("../../utils/tokens/tokens");
const HOST_IP_ADDRESS = process.env.API_HOST;
const emailHelper = require("../../utils/email/email-sender");

function sendHtmlBasedResetEmail (user, res, next) {
    const token = tokens.encodeWithExpiration(user.campusEmail, '1h');

    let subject = "Password Reset Email";
    const name = user.first_name + " " + user.last_name;
    const link = HOST_IP_ADDRESS + ":3000/resetPassword/" + token;

    let text = _getResetEmailHtml(name, link);

    let callback = (error, info) => {
        if (error) {
            return next("Password reset email couldn't be sent. " + error);
        } else {
            return res.json({"success": true, "message": "Password reset email sent. " + info.response})
        }
    };

    emailHelper.sendHtmlEmail(user.campusEmail, "Reset Password", text, callback);
}

function _getResetEmailHtml (name, link) {

    let header = "<div style='margin-bottom: 24px; color: #800029;'>Hi " + name + ",</div>";

    let text = "<div style='margin-top: 8px; margin-bottom: 16px;'>To reset your password please follow this link:</div>";

    let linkHtml = "<div style='color: #800029; margin-bottom: 16px;'><a href='http://" + link + "'>" + link + "</a></div>";

    let endNote = "<div style='color: #800029;'>Sincerely,<br />ULM Scheduling application team</div>";

    let html = header + text + linkHtml + endNote;

    return html;
}

function sendTemplateResetEmail () {

    const token = tokens.encodeWithExpiration(user.campusEmail, '1h');

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

    emailHelper.sendHtmlTemplateEmail("reset-password", {to: user.campusEmail, from: "ULM Scheduling Website <no-reply>"}, {first_name: user.first_name, link: token}, callback);
}

function sendPasswordResetEmail(user, res, next) {
    sendHtmlBasedResetEmail(user, res, next);
}

module.exports = {
    sendPasswordResetEmail,
};