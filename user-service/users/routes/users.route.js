const express = require("express");
const router = express.Router();
const controller = require("../controller/accounts.controller");

router.route("/").post(controller.createUser);
router.route("/login").post(controller.loginUser);

router.route("/:id").get(controller.getUserById);
router.route("/").get(controller.getUsers);

router.route("/:id").patch(controller.updateUser);
router.route("/:id").delete(controller.deleteUser);

module.exports = router;