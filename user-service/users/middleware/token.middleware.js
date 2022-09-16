
import jwt from 'jsonwebtoken';
import { HttpResponse } from "../../constants/httpResponse.js";
import RedisInstance from '../../cache/instance.js';

const JwtBlacklist = new RedisInstance();
const KEY_VALUE = "invalid"

const serverErrorResponse = JSON.stringify({
    statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
    response: {
        status: false,
        message: "Error in request fulfilment!",
    },
});

export class Token {

    static analyseJwtToken(secret) {
        return async (req, res, next) => {
            try {
                console.log(secret)
                if (req.headers.authorization == null)
                    throw ({ name: 'JsonWebTokenError' });
        
                const decodedToken = jwt.verify(
                    req.headers.authorization.split(' ')[1],
                    secret);
        
                const status = await JwtBlacklist.getObject(req.headers.authorization)
                if (status)
                    throw ({ name: 'JsonWebTokenError' });
        
                // To be moved to access control
                // if (!isVerificationToken && targetUser && targetUser != decodedToken.username)
                //     throw ({ name: 'InvalidPrivilegesError' });
                res.locals.tokenData = decodedToken;
                next();
            } catch (errorObject) {
                console.log(errorObject)
                const errorResponse = JSON.parse(serverErrorResponse);
        
                if (
                    errorObject.name == "TokenExpiredError" ||
                    errorObject.name == "JsonWebTokenError"
                ) {
                    errorResponse.statusCode = HttpResponse.UNAUTHORIZED;
                    errorResponse.response.message = "Not Authorized to use service!";
                }
        
                return res.status(errorResponse.statusCode).json(errorResponse.response);
            }
        }
    }

    static blacklistJwtToken() {
        return async (req, res, next) => {
            try {
                console.log(101)
                const insertionStatus = await JwtBlacklist.createObject(req.headers.authorization, KEY_VALUE);
                await JwtBlacklist.setExpiryOfObject(req.headers.authorization, +res.locals.tokenData.exp);
                res.status(HttpResponse.OK).json({
                    status: true,
                    response: "Successfully logged user out!",
                });
            } catch (errorObject) {
                console.log(errorObject)
                const errorResponse = JSON.parse(serverErrorResponse);
        
                return res.status(errorResponse.statusCode).json(errorResponse.response);
            }
        }

    }
}

