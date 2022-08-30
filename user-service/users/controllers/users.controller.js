
import UserService from '../services/users.service.js';

const createUser = (req, res) => {
    const { email, username, password } = req.body;
    UserService
        .createUser(email, username, password)
        .then((response) => {
            return res.status(201).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ status: false, err });
        });
};

const authenticateUser = (req, res) => {
    const { username, password } = req.body;
    UserService
        .authenticateUser(username, password)
        .then((response) => {
            return res.status(200).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(500).json({ status: false, err });
        });
};

const getHealthStatus = (req, res) => {
    res.status(200).json({
        status: "true",
        response: "operational"
    });
};

const getUserByName = (req, res) => {
    const { username } = req.params;
    UserService
        .getUserByName(username)
        .then((response) => {
            return res.status(200).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(500).json({ status: false, err });
        });
};

const getUsers = (req, res) => {
    UserService
        .getUsers()
        .then((response) => {
            return res.status(200).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(500).json({ status: false, err });
        });
};

const updateUserByName = (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    UserService
        .updateUserByName(username, password)
        .then((response) => {
            return res.status(200).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(500).json({ status: false, err });
        });
};

const deleteUserByName = (req, res) => {
    const { username } = req.params;
    UserService
        .deleteUserByName(username)
        .then((response) => {
            return res.status(200).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(500).json({ status: false, err });
        });
};

export { createUser, authenticateUser, getHealthStatus, getUserByName, getUsers, updateUserByName, deleteUserByName }
