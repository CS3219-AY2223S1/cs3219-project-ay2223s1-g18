
import UserService from '../services/users.service.js';



const createUser = (req, res) => {
    const { email, name, password } = req.body;
    UserService
        .createUser(email, name, password)
        .then((response) => {
            return res.status(201).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            return res.status(500).json({ status: false, err });
        });
};

const authenticateUser = (req, res) => {
    const { name, password } = req.body;
    UserService
        .authenticateUser(name, password)
        .then((response) => {
            
            return res.status(201).json({
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

const getUserById = (req, res) => {
    const { id } = req.params;
    UserService
        .getUserById(id)
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

const updateUser = (req, res) => {
    const { id } = req.params;
    const { email, name, password } = req.body;
    UserService
        .updateUser(id, email, name, password)
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

const deleteUser = (req, res) => {
    const { id } = req.params;
    UserService
        .deleteUser(id)
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

export { createUser, authenticateUser, getHealthStatus, getUserById, getUsers, updateUser, deleteUser }
