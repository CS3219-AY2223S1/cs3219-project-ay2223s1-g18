
import UserService from '../services/users.service.js';
import { HttpResponse } from '../../constants/httpResponse.js';

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
            const serverResponse = {
                statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
                response: {
                    status: false,
                    message: "Error in request fulfilment!",
                    error: errorObject
                }
            }

            if (errorObject.name == 'ValidationError') {
                serverResponse.statusCode = HttpResponse.BAD_REQUEST
                serverResponse.response.message = "Email, Username and/or Password are missing!"
            }
                
            else if (errorObject.code == 11000) { // Duplicate Error
                serverResponse.statusCode = HttpResponse.CONFLICT
                serverResponse.response.message = "Email/Username exists in application!"
            }

            return res.status(serverResponse.statusCode).json(serverResponse.response);
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
        .catch((err) => {
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({ status: false, err });
        });
};

const getHealthStatus = (req, res) => {
    console.log(http)
    res.status(HttpResponse.OK).json({
        status: "true",
        response: "operational"
    });
};

const getUserByName = (req, res) => {
    const { username } = req.params;
    UserService
        .getUserByName(username)
        .then((response) => {
            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({ status: false, err });
        });
};

const getUsers = (req, res) => {
    UserService
        .getUsers()
        .then((response) => {
            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({ status: false, err });
        });
};

const updateUserByName = (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    UserService
        .updateUserByName(username, password)
        .then((response) => {
            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({ status: false, err });
        });
};

const deleteUserByName = (req, res) => {
    const { username } = req.params;
    UserService
        .deleteUserByName(username)
        .then((response) => {
            return res.status(HttpResponse.OK).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({ status: false, err });
        });
};

export { createUser, authenticateUser, getHealthStatus, getUserByName, getUsers, updateUserByName, deleteUserByName }
