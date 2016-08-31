const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;

// cron job to send emails to upcoming RSVPs

new CronJob('* * 6 * * *', function() {

  // error - fix this
  const transporter = nodemailer.createTransport('smtps://tabitha.blagdon%40gmail.com:sugabiggie@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  const mailOptions = {
      from: '"Tee Bee 👥" <tabitha.blagdon@gmail.com>', // sender address
      to: 'tabitha.blagdon@gmail.com, christinejchou@gmail.com', // list of receivers
      subject: 'EatUp Event Reminder ✔', // Subject line
      text: 'EatUp Event Reminder 🐴', // plaintext body
      html: '<b>EatUp Event Reminder 🐴</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });

}, null, true, 'America/Los_Angeles');
