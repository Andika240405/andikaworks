const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: false, // true untuk port 465
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

module.exports = transporter;