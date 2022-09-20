import Router from 'express';
const router = Router();

import { UserController } from '../controllers/users.controller.js';
import { TokenMiddleware } from '../middleware/token.middleware.js';
import { JwtSecrets } from '../../constants/jwtSecrets.js';

router.route("/signup").post(UserController.sendUserConfirmationToken());
router.route("/signup-verify").post(TokenMiddleware.analyseJwtToken(JwtSecrets.VERIFICATION), UserController.completeUserSignup(), TokenMiddleware.blacklistJwtToken());

router.route("/password-reset").post(UserController.sendResetPasswordToken());
router.route("/password-reset-verify").patch(TokenMiddleware.analyseJwtToken(JwtSecrets.VERIFICATION), UserController.completePasswordReset(), TokenMiddleware.blacklistJwtToken());

router.route("/auth").post(UserController.authenticateUser());
router.route("/logout").post(TokenMiddleware.analyseJwtToken(JwtSecrets.REFRESH), TokenMiddleware.blacklistJwtToken());


router.route("/health").get(UserController.getHealthStatus());
router.route("/accesstoken").get(TokenMiddleware.analyseJwtToken(JwtSecrets.REFRESH), UserController.getAccessToken());

router.route("/:username").get(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), UserController.getUserByName());
router.route("/").get(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), UserController.getUsers());

router.route("/:username").patch(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), UserController.updateUserByName());

router.route("/:username").delete(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), UserController.deleteUserByName(), TokenMiddleware.blacklistJwtToken());

export default router;