const nodemailer = require('nodemailer');



const generateEmail = (name, body) => {
    return `
<div style="padding: 1em 2em; font-family: sans-serif">
  <strong style="font-size: 1.2em; font-family: sans-serif">Hi , ${name}</strong>
  <br />
  <p style="font-size: 1.1em">${body}</p>
  <br />
  <strong style="font-size: 1.2em; font-family: sans-serif">Best Regards</strong
  ><br />
  <strong style="font-size: 1.2em; font-family: sans-serif"
    >LiveCryptoMining</strong
  >
  <br />
  <br />
  <div
    style="
      background-color: rgb(241, 239, 239);
      padding: 1em;
      font-family: sans-serif;
    "
  >
    <p style="text-align: center">
      If you found this message in your spam folder - make sure you transfer it
      to your inbox in order to receive important messages from our platform.
    </p>
    <p style="text-align: center">
      This is an automatically generated letter and the mailbox is not
      monitored, please don't reply to this email, rather message us through
      customer support.
    </p>
    <p style="text-align: center">
      &copy;Copyright 2024 Live Crypto Mining. All Rights Reserved.
    </p>
  </div>
</div>

    `
}


const sendEmail = async (name, receipient, subject, body) => {
    // Create a transporter using Zoho SMTP
    let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465, // Use 465 for secure connection (SSL)
        secure: true, // true for SSL
        auth: {
            user: process.env.MAILUSER, // Your Zoho email
            pass: process.env.MAILPASS, // Your app-specific password
        }
    });

    // Set up email data
    let mailOptions = {
        from: process.env.MAILUSER, // sender address
        to: receipient, // list of receivers
        subject: subject, // Subject line
        html: generateEmail(name, body) // HTML body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred:', error);
        }
        console.log('Email sent:', info.response);
    });

}


module.exports = sendEmail