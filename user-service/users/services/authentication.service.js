
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RedisInstance from '../../cache/instance.js';
import { sendEmail } from '../../mailer/process.js'
import dotenv from 'dotenv';
dotenv.config();

const JwtBlacklist = new RedisInstance();
const KEY_VALUE = "invalid"
const KEY_VERIFICATION_VALUE = "invalid_verify"

export async function hashPassword(password) {
    return bcrypt.hash(password, parseInt(process.env.HASH_SALT_ROUNDS));
};

export async function verifyHashPassword(enteredPassword, storedHashPassword) {
    return bcrypt.compare(enteredPassword, storedHashPassword);
};

export function createJwtToken(identifiers, isVerificationToken=true) {
    return {
        token: jwt.sign(
            identifiers,
            isVerificationToken ? process.env.JWT_VERIFICATION_TOKEN_SECRET : process.env.JWT_TOKEN_SECRET,
            { expiresIn: isVerificationToken ? process.env.JWT_VERIFICATION_TOKEN_EXPIRY : process.env.JWT_TOKEN_EXPIRY }),
    }
};

export async function analyseJwtToken(token, isVerificationToken=true, targetUser = null) {
    if (token == null)
        throw ({ name: 'JsonWebTokenError' });
    const decodedToken = jwt.verify(token.split(' ')[1], 
    isVerificationToken ? process.env.JWT_VERIFICATION_TOKEN_SECRET : process.env.JWT_TOKEN_SECRET);
    const status = await JwtBlacklist.getObject(token)
    if (status)
        throw ({ name: 'JsonWebTokenError' });

    if (!isVerificationToken && targetUser && targetUser != decodedToken.username)
        throw ({ name: 'InvalidPrivilegesError' });

    return decodedToken;
}

export async function blacklistJwtToken(token, tokenData, isVerificationToken=true) {
    const insertionStatus = await JwtBlacklist.createObject(token, 
        isVerificationToken ? KEY_VERIFICATION_VALUE : KEY_VALUE);
    await JwtBlacklist.setExpiryOfObject(token, +tokenData.exp);
}

export async function sendValidationEmailRequest(enclosedDetails, message, isSignup=false) {
    const resetToken = createJwtToken(enclosedDetails)
    const clientUrl = "http:localhost:3000"// to be changed later

    const apiType = isSignup ? "completeSignup" : "passwordReset"
    const urlLinkHeader = isSignup ? "Complete Signup" : "Reset Password"
    
    const resetUrl = `${clientUrl}/${apiType}?token=${resetToken.token}`
    
    const emailDetails = {
      to: enclosedDetails.email,
      subject: "Password Reset Request",
      text: message + `<a href=${resetUrl} clicktracking=off>${urlLinkHeader}</a>`,
    }
    await sendEmail(emailDetails);
  }
