import UserController from '../controllers/users.controller.js';
import Router from 'express';
const router = Router();

//router.route("/").post(UserController.createUser);
router.route("/auth").post(() => UserController.authenticateUser);

router.route("/health").get(() => UserController.getHealthStatus);
router.route("/:id").get(() => UserController.getUserById);
router.route("/").get(() => UserController.getUsers);

router.route("/:id").patch(() => UserController.updateUser);
router.route("/:id").delete(() => UserController.deleteUser);

export default router;