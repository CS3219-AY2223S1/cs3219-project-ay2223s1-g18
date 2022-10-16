import Router from 'express'

import { UserController } from '../controllers/auth.controller.js'
import { TokenMiddleware } from '../middleware/token.middleware.js'
import { JwtSecrets } from '../../constants/jwtSecrets.js'
const router = Router()

router.route('/signup').post(UserController.sendUserConfirmationToken())
router.route('/signup-verify').post(TokenMiddleware.analyseJwtToken(JwtSecrets.VERIFICATION), UserController.completeUserSignup(), TokenMiddleware.blacklistJwtToken())

router.route('/password-reset').post(UserController.sendResetPasswordToken())
router.route('/password-reset-verify').patch(TokenMiddleware.analyseJwtToken(JwtSecrets.VERIFICATION), UserController.completePasswordReset(), TokenMiddleware.blacklistJwtToken())

router.route('/auth').post(UserController.authenticateUser())
router.route('/logout').post(TokenMiddleware.analyseJwtToken(JwtSecrets.REFRESH), TokenMiddleware.blacklistJwtToken(true))

router.route('/health').get(UserController.getHealthStatus())
router.route('/accesstoken').get(TokenMiddleware.analyseJwtToken(JwtSecrets.REFRESH), UserController.getAccessToken())

router.route('/accounts/:username').get(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), UserController.getUserAccountByName())
router.route('/accounts').get(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), UserController.getUserAccounts())

router.route('/accounts/:username').patch(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), UserController.updateUserAccountByName())

router.route('/accounts/:username').delete(TokenMiddleware.analyseJwtToken(JwtSecrets.ACCESS), UserController.deleteUserAccountByName(), TokenMiddleware.blacklistJwtToken()) // to update when self is deleted

export default router
