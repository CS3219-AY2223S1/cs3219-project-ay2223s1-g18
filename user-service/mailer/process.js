
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

export async function sendEmail(options) {   
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.text,
    };
  
    await transporter.sendMail(mailOptions)
}