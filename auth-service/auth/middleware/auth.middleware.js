import jwt from 'jsonwebtoken'

import RedisInstance from '../../cache/instance.js'
import { HttpResponse } from '../../constants/httpResponse.js'

const JwtBlacklist = new RedisInstance()

const serverErrorResponse = JSON.stringify({
  statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
  response: {
    status: false,
    message: 'Error in request fulfilment!'
  }
})

export class AuthMiddleware {
  static getHealthStatus () {
    return async (req, res, next) => {
      res.status(HttpResponse.OK).json({
        status: 'true',
        response: 'validated'
      })
      next()
    }
  }

  static analyseJwtToken (secret) {
    return async (req, res) => {
      try {
        console.log(req.type)
        if (!req.headers.authorization) { throw new Error('Missing auth header') }
        
        const decodedToken = jwt.verify(
          req.headers.authorization.split(' ')[1],
          secret)

        const status = await JwtBlacklist.getObject(req.headers.authorization)
        if (status) { throw new Error('Jwt blacklisted') }

        res.header('token', JSON.stringify(decodedToken))

        res.status(HttpResponse.OK).json({
          status: 'true',
          response: 'operational'
        })

      } catch (errorObject) {
        console.log('ERROR')
        const errorResponse = JSON.parse(serverErrorResponse)

        if (
          errorObject.name === 'TokenExpiredError' ||
                    errorObject.message === 'JsonWebTokenError' || errorObject instanceof Error
        ) {
          errorResponse.statusCode = HttpResponse.UNAUTHORIZED
          errorResponse.response.message = 'Not Authorized to use service!'
        }
        res.status(errorResponse.statusCode).json(errorResponse.response)
      }
    }
  }

  static blacklistJwtToken (isLogout = false) {
    return async (req, res) => {
      try {
        await JwtBlacklist.setExpiryOfObject(req.headers.authorization, +res.locals.tokenData.exp)
        if (isLogout) {
          res.status(HttpResponse.OK).json({
            status: true,
            response: 'Successfully logged user out!'
          })
        }
      } catch (errorObject) {
        console.log(errorObject.toString())
        const errorResponse = JSON.parse(serverErrorResponse)

        res.status(errorResponse.statusCode).json(errorResponse.response)
      }
    }
  }

}

