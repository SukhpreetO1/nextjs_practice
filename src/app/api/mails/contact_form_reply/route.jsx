import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
});

const mailOptions = {
    from: email,
    to: 'ssingh77022@gmail.com',
    subject: 'Reply of Contact Form',
    text: 'This is a test email from Nodemailer.'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.error("Error sending email:", error);
    } else {
        console.log("Email sent:", info.response);
    }
});