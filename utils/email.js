const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'Sakura <sito6496@gmail.com>';
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url
      }
    );
    const mailOption = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    await this.newTransport().sendMail(mailOption);
  }

  async sendWelcome() {
    await this.send('Welcome', 'Welcome tp the Natours Family');
  }
};

// const sendEmail = async options => {
//   const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });

//   const mailOption = {
//     from: 'Sakura <sito6496@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message
//   };

//   await transporter.sendMail(mailOption);
// };

module.exports = sendEmail;
