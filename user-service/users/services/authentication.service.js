
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


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


