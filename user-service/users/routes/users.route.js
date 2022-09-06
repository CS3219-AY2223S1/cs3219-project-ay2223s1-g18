import Router from 'express';
const router = Router();

import { sendUserConfirmationToken, completeUserSignup, sendResetPasswordToken, completePasswordReset, authenticateUser, logoutUser, getHealthStatus, getUserByName, getUsers, updateUserByName, deleteUserByName } from '../controllers/users.controller.js';

router.route("/signup").post(sendUserConfirmationToken);
router.route("/signup-verify").post(completeUserSignup);

router.route("/password-reset").post(sendResetPasswordToken);
router.route("/password-reset-verify").patch(completePasswordReset);

router.route("/auth").post(authenticateUser);
router.route("/logout").post(logoutUser);

router.route("/:username").patch(updateUserByName);

router.route("/health").get(getHealthStatus);
router.route("/:username").get(getUserByName);
router.route("/").get(getUsers);


router.route("/:username").delete(deleteUserByName);

export default router;