import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export async function hashPassword(password)  {
    console.log(process.env.HASH_SALT_ROUNDS)
    return bcrypt.hash(password, process.env.HASH_SALT_ROUNDS);
};

export function createJwtToken(username)  {
    return {
        token: jwt.sign(
            { data: username }, 
            process.env.JWT_TOKEN_SECRET, 
            { expiresIn: process.env.JWT_TOKEN_EXPIRY }),
        expiresIn: process.env.JWT_TOKEN_EXPIRY
    }
};



