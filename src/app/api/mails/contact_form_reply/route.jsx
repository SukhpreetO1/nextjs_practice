import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
});

function generateEmailContent(selectedReplyMessages, blogContactFormReply) {
    return `
      <div>
        <p>Dear ${selectedReplyMessages.contact_name},</p>
        <p>Thank you for your message.</p>
        <p>Here is the reply of the contact form that submitted by you :</p>
        <p>Message : ${selectedReplyMessages.contact_message}</p>
        <p>Reply : ${blogContactFormReply}</p>
        <p>Best regards,</p>
        <p>Admin</p>
      </div>
    `;
}

export async function POST(request) {
    const requestData = await request.json();

    const selectedReplyMessages = requestData.selectedReplyMessages;
    const blogContactFormReply = requestData.blog_contact_form_reply;

    const htmlContent = generateEmailContent(selectedReplyMessages, blogContactFormReply);


    const mailOptions = {
        from: email,
        to: selectedReplyMessages.contact_email,
        subject: 'Reply of Contact Form',
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return NextResponse.json({ message: "Email send successfully.", status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.error(error, 500);
    }
}