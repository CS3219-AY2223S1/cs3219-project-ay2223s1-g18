import Router from 'express';
const router = Router();

import { sendUserConfirmationToken, completeUserSignup, sendResetPasswordToken, completePasswordReset, authenticateUser, logoutUser, getHealthStatus, getUserByName, getUsers, updateUserByName, deleteUserByName } from '../controllers/users.controller.js';
import { analyseJwtToken } from '../middleware/token.middleware.js';

router.route("/signup").post(sendUserConfirmationToken);
router.route("/signup-verify").post(analyseJwtToken, completeUserSignup);

router.route("/password-reset").post(sendResetPasswordToken);
router.route("/password-reset-verify").patch(analyseJwtToken, completePasswordReset);

router.route("/auth").post(authenticateUser);
router.route("/logout").post(analyseJwtToken, logoutUser);

router.route("/:username").patch(analyseJwtToken, updateUserByName);

router.route("/health").get(getHealthStatus);
router.route("/:username").get(analyseJwtToken, getUserByName);
router.route("/").get(analyseJwtToken, getUsers);


router.route("/:username").delete(analyseJwtToken, deleteUserByName);

export default router;