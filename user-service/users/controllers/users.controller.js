
import UserService from '../services/users.service.js';

export default class UserController {
    createUser = (req, res) => {
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

    authenticateUser = (req, res) => {
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

    getHealthStatus = (req, res) => {
        res.json({
            status: "ok",
        });
    };

    getUserById = (req, res) => {
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

    getUsers = (req, res) => {
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
    
    updateUser = (req, res) => {
        const { id } = req.params;
        const { password } = req.body;
        UserService
            .updateUser(id, password)
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

    deleteUser = (req, res) => {
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
}
