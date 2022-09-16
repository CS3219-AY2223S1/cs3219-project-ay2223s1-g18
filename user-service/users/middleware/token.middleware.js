
import { HttpResponse } from "../../constants/httpResponse.js";
import jwt from 'jsonwebtoken';


const serverErrorResponse = JSON.stringify({
    statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
    response: {
        status: false,
        message: "Error in request fulfilment!",
    },
});

export async function analyseJwtToken(req, res, next) {
    try {
        console.log(req.headers)
        if (req.headers.authorization == null)
            throw ({ name: 'JsonWebTokenError' });

        const decodedToken = jwt.verify(
            req.headers.authorization.split(' ')[1], 
            process.env.JWT_TOKEN_SECRET);

        // TODO: Validate blacklist status
        // const status = await JwtBlacklist.getObject(token)
        // if (status)
        //     throw ({ name: 'JsonWebTokenError' });

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


    // return decodedToken;
}
// Blacklist impln to be revised
// export async function blacklistJwtToken(token, tokenData) {
//     const insertionStatus = await JwtBlacklist.createObject(token, KEY_VALUE);
//     await JwtBlacklist.setExpiryOfObject(token, +tokenData.exp);
// }