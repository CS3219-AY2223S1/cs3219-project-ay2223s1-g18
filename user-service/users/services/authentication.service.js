import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export function createJwtToken(username)  {
    return {
        token: jwt.sign(
            { data: username }, 
            process.env.JWT_TOKEN_SECRET, 
            { expiresIn: process.env.JWT_TOKEN_EXPIRY }),
        expiresIn: process.env.JWT_TOKEN_EXPIRY
    }
};



