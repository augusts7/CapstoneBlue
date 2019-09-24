

var nodemailer = require('nodemailer-promise');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ulm-scheduling.application@gmail.com',
    pass: 'CapstoneBlueProject'
  }
});


async function sendEmailThroughTransporter(mailOptions, callback) {
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error while attempting to send email.\n" + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        callback(error, info);
    });
}

async function sendEmail (toEmail, subject, text, callback) {

    var mailOptions = {
        from: 'ulm-scheduling.application@gmail.com',
        to: toEmail,
        subject: subject,
        text: text
    };

    await sendEmailThroughTransporter(mailOptions, callback);
}
 
async function sendHtmlEmail (toEmail, subject, html, callback) {

    var mailOptions = {
        from: 'ulm-scheduling.application@gmail.com',
        to: toEmail,
        subject: subject,
        html: html
    };
     
    await sendEmailThroughTransporter(mailOptions, callback);
}

module.exports = {
    "sendEmail": sendEmail,
    "sendHtmlEmail": sendHtmlEmail
}
