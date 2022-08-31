import { startRedisClient } from '../../cache/setup.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = startRedisClient()
const KEY_VALUE = "valid"

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

export function analyseJwtToken(token, isBlacklistingToken) {
    if (token == null)
        throw ({ name: 'JsonWebTokenError' });
    const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_TOKEN_SECRET);
    if (!isBlacklistingToken) {
        const status = await redisClient.GET(token);

        if (status)
            throw ({ name: 'JsonWebTokenError' });
    }
    return decodedToken;
}

export function blacklistJwtToken(token) {
    const tokenData = analyseJwtToken(token, true);
    const insertionStatus = await redisClient.SET(token, KEY_VALUE);
    await redisClient.EXPIREAT(token, +tokenData.exp);
}
