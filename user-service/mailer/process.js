
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

export async function sendEmail(options) {
    console.log(process.env.EMAIL_SERVICE + " " + process.env.EMAIL_USERNAME + " " + process.env.EMAIL_PASSWORD + process.env.EMAIL_FROM)
    
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
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