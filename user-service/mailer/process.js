
import nodemailer from 'nodemailer'

async function sendEmail(options) {   
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
export async function sendValidationEmailRequest(enclosedDetails, message, token, isSignup=false) {
  const clientUrl = "http://localhost:3000"// to be changed later

  const apiType = isSignup ? "completeSignup" : "passwordReset"
  const urlLinkHeader = isSignup ? "Complete Signup" : "Reset Password"
  
  const resetUrl = `${clientUrl}/${apiType}?token=${token}`
  
  const emailDetails = {
    to: enclosedDetails.email,
    subject: "Password Reset Request",
    text: message + `<a href=${resetUrl} clicktracking=off>${urlLinkHeader}</a>`,
  }
  await sendEmail(emailDetails);
}