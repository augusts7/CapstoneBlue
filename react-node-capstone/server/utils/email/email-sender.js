var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ulm.scheduling.application@gmail.com',
    pass: 'CapstoneBlueProject'
  }
});


function sendEmailThroughTransporter(mailOptions, callback) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error while attempting to send email.\n" + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        callback(error, info);
    });
}

function sendEmail (toEmail, subject, text, callback) {

    var mailOptions = {
        from: 'ulm-scheduling.application@gmail.com',
        to: toEmail,
        subject: subject,
        text: text
    };

    sendEmailThroughTransporter(mailOptions, callback);
}


 
function sendHtmlEmail (toEmail, subject, html, callback) {

    var mailOptions = {
        from: 'ulm-scheduling.application@gmail.com',
        to: toEmail,
        subject: subject,
        html: {path: path}
    };
     
    sendEmailThroughTransporter(mailOptions, callback);
}

module.exports = {
    sendEmail,
    sendHtmlEmail
}
