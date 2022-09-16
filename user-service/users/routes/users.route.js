import Router from 'express';
const router = Router();

import { sendUserConfirmationToken, completeUserSignup, sendResetPasswordToken, completePasswordReset, authenticateUser, getHealthStatus, getUserByName, getUsers, updateUserByName, deleteUserByName } from '../controllers/users.controller.js';
import { Token } from '../middleware/token.middleware.js';
import { JwtSecrets } from '../../constants/jwtSecrets.js';

router.route("/signup").post(sendUserConfirmationToken);
router.route("/signup-verify").post(Token.analyseJwtToken(JwtSecrets.VERIFICATION) , completeUserSignup, Token.blacklistJwtToken());

router.route("/password-reset").post(sendResetPasswordToken);
router.route("/password-reset-verify").patch(Token.analyseJwtToken(JwtSecrets.VERIFICATION), completePasswordReset, Token.blacklistJwtToken);

router.route("/auth").post(authenticateUser);
router.route("/logout").post(Token.analyseJwtToken(JwtSecrets.REFRESH), Token.blacklistJwtToken());

router.route("/:username").patch(Token.analyseJwtToken(JwtSecrets.ACCESS), updateUserByName);

router.route("/health").get(getHealthStatus);
router.route("/:username").get(Token.analyseJwtToken(JwtSecrets.ACCESS), getUserByName);
router.route("/").get(Token.analyseJwtToken(JwtSecrets.ACCESS), getUsers);


router.route("/:username").delete(Token.analyseJwtToken(JwtSecrets.ACCESS), deleteUserByName, Token.blacklistJwtToken());

export default router;