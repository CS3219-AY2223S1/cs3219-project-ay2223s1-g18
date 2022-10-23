import jwt from 'jsonwebtoken'

import RedisInstance from '../../cache/instance.js'
import { HttpResponse } from '../../constants/httpResponse.js'
import { JwtSecrets } from '../../constants/jwtSecrets.js'

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
        response: 'operational'
      })
      next()
    }
  }

  static analyseJwtToken (secret) {
    return async (req, res) => {
      try {
        console.log(req.headers['x-original-uri'])
        if (!req.headers.authorization) { throw new Error('Missing auth header') }

        const decodedToken = jwt.verify(
          req.headers.authorization.split(' ')[1],
          secret)
        const status = await JwtBlacklist.getObject(req.headers.authorization)
        if (status) { throw new Error('Jwt blacklisted') }

        res.status(HttpResponse.OK).json({
          status: true,
          response: {
            decodedToken
          }
        })
      } catch (errorObject) {
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

  static getAccessToken (username) {
    return async (req, res) => {
      try {
        res.status(HttpResponse.OK).json({
          status: true,
          response: {
            accessToken: createJwtToken({ username }, JwtSecrets.ACCESS, process.env.ACCESS_TOKEN_EXPIRY)
          }
        })
      } catch (errorObject) {
        console.log(errorObject.toString())
        const errorResponse = JSON.parse(serverErrorResponse)

        res.status(errorResponse.statusCode).json(errorResponse.response)
      }
    }
  }

  static getInitialTokens (username) {
    return async (req, res) => {
      try {
        res.status(HttpResponse.OK).json({
          status: true,
          response: {
            refreshToken: createJwtToken({ username }, JwtSecrets.REFRESH, process.env.REFRESH_TOKEN_EXPIRY),
            accessToken: createJwtToken({ username }, JwtSecrets.ACCESS, process.env.ACCESS_TOKEN_EXPIRY)
          }
        })
      } catch (errorObject) {
        console.log(errorObject.toString())
        const errorResponse = JSON.parse(serverErrorResponse)

        res.status(errorResponse.statusCode).json(errorResponse.response)
      }
    }
  }
}

function createJwtToken (identifiers, tokenSecret, tokenExpiry) {
  return jwt.sign(identifiers, tokenSecret, { expiresIn: tokenExpiry })
}
