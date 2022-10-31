import Router from 'express'

import { UserController } from '../controllers/users.controller.js'
const router = Router()

router.route('/signup').post(UserController.sendUserConfirmationToken())
router.route('/signup-verify').post(UserController.completeUserSignup())

router.route('/password-reset').post(UserController.sendResetPasswordToken())
router.route('/password-reset-verify').patch(UserController.completePasswordReset())

router.route('/auth').post(UserController.authenticateUser())
router.route('/get-access').get(UserController.getAccessToken())

router.route('/health').get(UserController.getHealthStatus())

router.route('/accounts/:username').get(UserController.getUserAccountByName())
router.route('/accounts').get(UserController.getUserAccounts())

router.route('/accounts/:username').patch(UserController.updateUserAccountByName())

router.route('/accounts/:username').delete(UserController.deleteUserAccountByName())

export default router
