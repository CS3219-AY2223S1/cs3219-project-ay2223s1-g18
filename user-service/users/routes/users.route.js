const express = require("express");
const router = express.Router();
const controller = require("../controller/users.controller");

router.route("/").post(controller.createUser);
router.route("/auth").post(controller.authenticateUser);

router.route("/:id").get(controller.getUserById);
router.route("/").get(controller.getUsers);

router.route("/:id").patch(controller.updateUser);
router.route("/:id").delete(controller.deleteUser);

module.exports = router;