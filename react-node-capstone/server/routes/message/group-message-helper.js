const HOST_IP_ADDRESS = process.env.API_HOST;
const emailHelper = require("../../utils/email/email-sender");

function sendHtmlBasedGroupEmail (user, message) {

    let subject = "Group Message from " + message.groupName;

    const name = user.first_name + " " + user.last_name;

    let html = _getResetGroupHtml(name, message);

    let callback = (error, info) => {

    };

    emailHelper.sendHtmlEmail(user.campusEmail, subject, html, callback);
}

function _getResetGroupHtml (name, message) {

    let header = "<div style='margin-bottom: 24px; color: #800029;'>Hi " + name + ",</div>";

    let groupInfo = "<div style='margin-top: 8px; margin-bottom: 16px;'>You have a new message from the Group " + message.groupName + "</div>";

    let text = "<div style='margin-top: 8px; margin-bottom: 16px;'>" + message.message + "</div>";

    let webLink = "<div style='margin-bottom: 48px; text-decoration: none;'><a href='http://" + HOST_IP_ADDRESS + "'>" + "ULM Scheduling Application" + "</a></div>";

    let endNote = "<div style='color: #800029;'>Sincerely,<br />" + message.sentBy + "<br />Group Name: " + message.groupName + "</div>";

    return header + groupInfo + text + endNote + webLink;
}


function sendGroupMessage(sendToUsers, message) {

    sendToUsers.forEach((user) => {
        sendHtmlBasedGroupEmail(user, message);
    });
}

module.exports = {
    sendGroupMessage,
};