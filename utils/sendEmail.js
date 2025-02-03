const nodemailer = require('nodemailer');

const sendEmail = async (emailOptions) => {
    // 1- Create transporter (service to send email via it ex. gmail, mailgun, mailtrap, sendGrid)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, // if secure false , port=587 else 465
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // 2- Define email options (from , to , subject, format, email content)
    const mailOpts = {
        from: 'E-shop App <rammal.md@gmail.com>',
        to: emailOptions.email,
        subject: emailOptions.subject,
        text: emailOptions.message,
    };

    // 3- Send email
    await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;
