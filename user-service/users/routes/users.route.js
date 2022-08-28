//import UserController from '../controllers/users.controller.js';
import Router from 'express';
const router = Router();

import { createUser, authenticateUser, getHealthStatus, getUserById, getUsers, updateUser, deleteUser} from '../controllers/users.controller.js';

router.route("/").post(createUser);
router.route("/auth").post(authenticateUser);

router.route("/health").get(getHealthStatus);
router.route("/:id").get(getUserById);
router.route("/").get(getUsers);

router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);

export default router;