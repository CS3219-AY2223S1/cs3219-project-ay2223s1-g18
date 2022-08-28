const usersService = require("../services/users.service");

module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  usersService
    .createUser(name, email, password)
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

module.exports.authenticateUser = (req, res) => {
    const { name, email, password } = req.body;
    usersService
      .createUser(name, email, password)
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

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  usersService
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

module.exports.getUsers = (req, res) => {
  usersService
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

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;
  usersService
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

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  usersService
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
