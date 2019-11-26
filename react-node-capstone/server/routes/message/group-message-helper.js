const HOST_IP_ADDRESS = process.env.API_HOST;
const emailHelper = require("../../utils/email/email-sender");

function sendHtmlBasedGroupEmail (user, message) {

    let subject = "Group Message from " + message.groupName;

    const name = user.first_name + " " + user.last_name;

    let text = _getResetGroupHtml(name, message);

    let callback = (error, info) => {

    };

    emailHelper.sendHtmlEmail(user.campusEmail, "Reset Password", text, callback);
}

function _getResetGroupHtml (name, message) {

    let header = "<div style='margin-bottom: 24px; color: #800029;'>Hi " + name + ",</div>";

    let text = "<div style='margin-top: 8px; margin-bottom: 16px;'>" + message.message + "</div>";

    let endLink = "<div style='color: #800029; margin-bottom: 16px;'><a href='http://" + HOST_IP_ADDRESS + "'>" + HOST_IP_ADDRESS + "</a></div>";

    let endNote = "<div style='color: #800029;'>Sincerely,<br />ULM Scheduling application team</div>";

    return header + text + endNote + endLink;
}


async function sendGroupMessage(sendToUsers, message, res, next) {

    sendToUsers.forEach((user) => {
        sendHtmlBasedGroupEmail(user, message);
    });
}

module.exports = {
    sendGroupMessage,
};