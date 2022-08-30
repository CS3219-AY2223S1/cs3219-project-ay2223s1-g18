
import UserService from '../services/users.service.js';
import { HttpResponse } from '../../constants/httpResponse.js';

const serverErrorResponse = JSON.stringify({
    statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
    response: {
        status: false,
        message: "Error in request fulfilment!",
    }
})

const createUser = (req, res) => {
    const { email, username, password } = req.body;
    UserService
        .createUser(email, username, password)
        .then((response) => {
            return res.status(HttpResponse.CREATED).json({
                status: true,
                response,
            });
        })
        .catch((errorObject) => {
            const errorResponse = JSON.parse(serverErrorResponse)
            if (errorObject.name == 'ValidationError') {
                errorResponse.statusCode = HttpResponse.BAD_REQUEST
                errorResponse.response.message = "Email, Username and/or Password are missing!"
            }
                
            else if (errorObject.code == 11000) { // Duplicate Error
                errorResponse.statusCode = HttpResponse.CONFLICT
                errorResponse.response.message = "Email/Username exists in application!"
            }

            return res.status(errorResponse.statusCode).json(errorResponse.response);
        });
};

const authenticateUser = (req, res) => {
    const { username, password } = req.body;
    UserService
        .authenticateUser(username, password)
        .then((response) => {
            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((errorObject) => {
            const errorResponse = JSON.parse(serverErrorResponse)
            if (errorObject.name == 'ValidationError') {
                errorResponse.statusCode = HttpResponse.BAD_REQUEST
                errorResponse.response.message = "Username and/or Password are missing!"
            }

            else if (errorObject.name == 'BadUsernameError' || errorObject.name == 'BadPasswordError') {
                errorResponse.statusCode = HttpResponse.UNAUTHORIZED
                errorResponse.response.message = "Invalid Username and/or Password!"
            }

            return res.status(errorResponse.statusCode).json(errorResponse.response);
        });
};

const getHealthStatus = (req, res) => {
    res.status(HttpResponse.OK).json({
        status: "true",
        response: "operational"
    });
};

const getUserByName = (req, res) => {
    const { username } = req.params;
    const token = req.headers.authorization;
    UserService
        .getUserByName(token, username)
        .then((response) => {
            if(response.length == 0)
                throw({name: 'BadUsernameError'})
            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((errorObject) => {
            const errorResponse = JSON.parse(serverErrorResponse)
            
            if (errorObject.name == 'BadUsernameError') {
                errorResponse.statusCode = HttpResponse.NOT_FOUND
                errorResponse.response.message = "No such Username found for update!"
            }

            else if (errorObject.name == 'JsonWebTokenError') {
                errorResponse.statusCode = HttpResponse.FORBIDDEN
                errorResponse.response.message = "Not Authorized to use service!"
            }
            

            return res.status(errorResponse.statusCode).json(errorResponse.response);
        });
};

const getUsers = (req, res) => {
    const token = req.headers.authorization;
    UserService
        .getUsers(token)
        .then((response) => {
            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((errorObject) => {
            const errorResponse = JSON.parse(serverErrorResponse)
            if (errorObject.name == 'BadUsernameError') {
                errorResponse.statusCode = HttpResponse.NOT_FOUND
                errorResponse.response.message = "No such Username found for update!"
            }
            else if (errorObject.name == 'JsonWebTokenError') {
                errorResponse.statusCode = HttpResponse.FORBIDDEN
                errorResponse.response.message = "Not Authorized to use service!"
            }

            return res.status(errorResponse.statusCode).json(errorResponse.response);
        });
};

const updateUserByName = (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    const token = req.headers.authorization;
    UserService
        .updateUserByName(token, username, password)
        .then((response) => {

            if (!response)
                throw ({name: 'BadUsernameError'})

            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((errorObject) => {
            const errorResponse = JSON.parse(serverErrorResponse)
            if (errorObject.name == 'ValidationError') {
                errorResponse.statusCode = HttpResponse.BAD_REQUEST
                errorResponse.response.message = "Password is missing!"
            }
            else if (errorObject.name == 'BadUsernameError') {
                errorResponse.statusCode = HttpResponse.NOT_FOUND
                errorResponse.response.message = "No such Username found for update!"
            }

            else if (errorObject.name == 'JsonWebTokenError') {
                errorResponse.statusCode = HttpResponse.FORBIDDEN
                errorResponse.response.message = "Not Authorized to use service!"
            }

            return res.status(errorResponse.statusCode).json(errorResponse.response);
        });
};

const deleteUserByName = (req, res) => {
    const { username } = req.params;
    const token = req.headers.authorization;
    UserService
        .deleteUserByName(token, username)
        .then((response) => {
            if (response.deletedCount == 0)
                throw ({name: 'BadUsernameError'})
            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((errorObject) => {
            const errorResponse = JSON.parse(serverErrorResponse)
            if (errorObject.name == 'BadUsernameError') {
                errorResponse.statusCode = HttpResponse.NOT_FOUND
                errorResponse.response.message = "Invalid username supplied for deletion!"
            }

            else if (errorObject.name == 'JsonWebTokenError') {
                errorResponse.statusCode = HttpResponse.FORBIDDEN
                errorResponse.response.message = "Not Authorized to use service!"
            }

            return res.status(errorResponse.statusCode).json(errorResponse.response);
        });
};

export { createUser, authenticateUser, getHealthStatus, getUserByName, getUsers, updateUserByName, deleteUserByName }
