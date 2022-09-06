
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RedisInstance from '../../cache/instance.js';
import { sendEmail } from '../../mailer/process.js'
import dotenv from 'dotenv';
dotenv.config();

const JwtBlacklist = new RedisInstance();
const KEY_VALUE = "invalid"

export async function hashPassword(password) {
    return bcrypt.hash(password, parseInt(process.env.HASH_SALT_ROUNDS));
};

export async function verifyHashPassword(enteredPassword, storedHashPassword) {
    return bcrypt.compare(enteredPassword, storedHashPassword);
};

export function createJwtToken(username) {
    return {
        token: jwt.sign(
            { username },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRY }),
        expiresIn: process.env.JWT_TOKEN_EXPIRY
    }
};

export async function analyseJwtToken(token, targetUser = null) {
    // if (targetUser &&  targetUser != decodedToken)
    if (token == null)
        throw ({ name: 'JsonWebTokenError' });
    const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_TOKEN_SECRET);
    const status = await JwtBlacklist.getObject(token)
    if (status)
        throw ({ name: 'JsonWebTokenError' });

    if (targetUser && targetUser != decodedToken.username)
        throw ({ name: 'InvalidPrivilegesError' });

    return decodedToken;
}

export async function blacklistJwtToken(token, tokenData) {
    const insertionStatus = await JwtBlacklist.createObject(token, KEY_VALUE);
    await JwtBlacklist.setExpiryOfObject(token, +tokenData.exp);
}

export async function sendVerificationEmail() {
    const resetUrl = 'xxx'
    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;
    
    const emailDetails = {
      to: "theopinto98@gmail.com",
      subject: "Password Reset Request",
      text: message,
    }
    console.log(101)
    sendEmail(emailDetails);
  }
