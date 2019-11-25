const nodemailer = require('nodemailer');
const Email = require("email-templates");


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ulm.scheduling.application@gmail.com',
        pass: 'CapstoneBlueProject'
    }
});


function _sendEmailThroughTransporter(mailOptions, callback) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error while attempting to send email.\n" + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        callback(error, info);
    });
}

function sendHtmlEmail(toEmail, subject, html, callback) {

    var mailOptions = {
        from: 'ulm-scheduling.application@gmail.com',
        to: toEmail,
        subject: subject,
        html: html
    };

    _sendEmailThroughTransporter(mailOptions, callback);
}

function sendEmail(toEmail, subject, text, callback) {

    var mailOptions = {
        from: 'ULM Scheduling Website',
        to: toEmail,
        subject: subject,
        text: text
    };

    _sendEmailThroughTransporter(mailOptions, callback);
}

function sendHtmlTemplateEmail(template, message, locals, callback) {
    const email = new Email({
        transport: transporter,
        send: true,
        preview: false,
    });

    email.send({
        template: template,
        message: message,
        locals: locals
    }).then(() => {
        console.log('email has been sent!');
        callback();
    });
}

module.exports = {
    sendEmail,
    sendHtmlEmail,
    sendHtmlTemplateEmail
};
