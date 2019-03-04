const nodemailer = require('nodemailer');

var hasUpdatedList = function(list) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your mail address',
      pass: 'your password'
    }
  });

  var mailOptions = {
    from: 'your mail address',
    to: 'to send mail address',
    subject: '',
    text: ''
  };

  list.forEach((v, i) => {
    mailOptions.subject = v.text;
    mailOptions.text = v.href;

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) throw err;
      console.log('Email send: ' + info.response);
    });
  });
}
