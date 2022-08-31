//import UserController from '../controllers/users.controller.js';
import Router from 'express';
const router = Router();

import { createUser, authenticateUser, logoutUser, getHealthStatus, getUserByName, getUsers, updateUserByName, deleteUserByName } from '../controllers/users.controller.js';

router.route("/").post(createUser);
router.route("/auth").post(authenticateUser);
router.route("/logout").post(logoutUser);

router.route("/health").get(getHealthStatus);
router.route("/:username").get(getUserByName);
router.route("/").get(getUsers);

router.route("/:username").patch(updateUserByName);
router.route("/:username").delete(deleteUserByName);

export default router;