import Router from 'express';
const router = Router();

import { TokenController } from '../controllers/users.controller.js';
import { TokenMiddleware } from '../middleware/token.middleware.js';
import { JwtSecrets } from '../../constants/jwtSecrets.js';

router.route("/signup").post(TokenController.sendUserConfirmationToken());
router.route("/signup-verify").post(TokenMiddleware.analyseJwtToken(JwtSecrets.VERIFICATION));

router.route("/password-reset").post(TokenController.sendResetPasswordToken());
router.route("/password-reset-verify").patch(TokenMiddleware.analyseJwtToken(JwtSecrets.VERIFICATION), TokenController.completePasswordReset(), TokenMiddleware.blacklistJwtToken);

router.route("/auth").post(TokenController.authenticateUser());
router.route("/logout").post(TokenMiddleware.analyseJwtToken(JwtSecrets.REFRESH), TokenMiddleware.blacklistJwtToken());


router.route("/health").get(TokenController.getHealthStatus());
router.route("/accesstoken").get(TokenMiddleware.analyseJwtToken(JwtSecrets.REFRESH), TokenController.getAccessToken());

router.route("/:username").get(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), TokenController.getUserByName());
router.route("/").get(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), TokenController.getUsers());

router.route("/:username").patch(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), TokenController.updateUserByName());

router.route("/:username").delete(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), TokenController.deleteUserByName(), TokenMiddleware.blacklistJwtToken());

export default router;