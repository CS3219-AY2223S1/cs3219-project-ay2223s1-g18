import Router from 'express'

import { AuthMiddleware } from '../middleware/auth.middleware.js.js'
import { JwtSecrets } from '../../constants/jwtSecrets.js'
const router = Router()

router.route('/health').get(AuthMiddleware.getHealthStatus())

router.route('/verification').get(AuthMiddleware.analyseJwtToken(JwtSecrets.VERIFICATION))
router.route('/access').get(AuthMiddleware.analyseJwtToken(JwtSecrets.ACCESS))
router.route('/refresh').get(AuthMiddleware.analyseJwtToken(JwtSecrets.REFRESH))

router.route('/get-access').get(AuthMiddleware.analyseJwtToken(JwtSecrets.REFRESH), AuthMiddleware.getAccessToken())
router.route('/get-refresh-access').post(AuthMiddleware.getInitialTokens())

router.route('/logout').post(AuthMiddleware.analyseJwtToken(JwtSecrets.REFRESH), AuthMiddleware.blacklistJwtToken(true))

export default router
