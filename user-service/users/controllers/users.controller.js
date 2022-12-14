import UserService from '../services/users.service.js'
import { HttpResponse } from '../../constants/httpResponse.js'

const serverErrorResponse = JSON.stringify({
  statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
  response: {
    status: false,
    message: 'Error in request fulfilment!'
  }
})

export class UserController {
  static sendUserConfirmationToken () {
    return async (req, res, next) => {
      const { email, username, password } = req.body
      UserService.createUserVerificationRequest(email, username, password)
        .then(() => {
          res.status(HttpResponse.ACCEPTED).json({
            status: true,
            response: { message: 'Successfully sent token email!' }
          })
          next()
        })
        .catch((errorObject) => {
          console.log(errorObject.toString())
          const errorResponse = JSON.parse(serverErrorResponse)

          if (errorObject.message === 'ValidationError') {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST
            errorResponse.response.message =
              'Email, Username and/or Password are missing!'
          } else if (errorObject.message === 'ExistingUserError') {
            // Duplicate Error
            errorResponse.statusCode = HttpResponse.CONFLICT
            errorResponse.response.message = 'Email or username has been taken.'
          }

          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static completeUserSignup () {
    return async (req, res, next) => {
      const tokenData = JSON.parse(req.headers.token)
      UserService.completeUserSignup(tokenData)
        .then((response) => {
          res.status(HttpResponse.CREATED).json({
            status: true,
            response
          })
          next()
        })
        .catch((errorObject) => {
        // TODO: user already added
          console.log(errorObject.toString())
          const errorResponse = JSON.parse(serverErrorResponse)
          return res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static sendResetPasswordToken () {
    return async (req, res, next) => {
      const { email } = req.body
      UserService.createResetVerificationRequest(email)
        .then(() => {
          res.status(HttpResponse.ACCEPTED).json({
            status: true,
            response: { message: 'Successfully sent token email!' }
          })
          next()
        })
        .catch((errorObject) => {
          console.log(errorObject)
          const errorResponse = JSON.parse(serverErrorResponse)

          if (errorObject.message === 'ValidationError') {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST
            errorResponse.response.message =
              'No such user with email found!'
          }
          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static completePasswordReset () {
    return async (req, res, next) => {
      console.log('101')
      console.log(req.body)
      const { password } = req.body
      const tokenData = JSON.parse(req.headers.token)
  
      UserService.completePasswordReset(tokenData, password)
        .then((response) => {
          if (!response) throw new Error({ name: 'BadUsernameError' })

          res.status(HttpResponse.OK).json({
            status: true,
            response
          })
          next()
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse)

          if (errorObject.message === 'ValidationError') {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST
            errorResponse.response.message = 'Password is missing!'
          }

          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static authenticateUser () {
    return async (req, res, next) => {
      const { username, password } = req.body
      UserService.authenticateUser(username, password)
        .then((response) => {
          res.status(HttpResponse.OK).json({
            status: true,
            response
          })
          next()
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse)
          if (errorObject.message === 'ValidationError') {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST
            errorResponse.response.message =
              'Username and/or Password are missing!'
          } else if (errorObject.message === 'BadUsernameError' || errorObject.message === 'BadPasswordError') {
            errorResponse.statusCode = HttpResponse.UNAUTHORIZED
            errorResponse.response.message = 'Invalid Credentials provided!'
          }

          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static getHealthStatus () {
    return async (req, res, next) => {
      res.status(HttpResponse.OK).json({
        status: 'true',
        response: 'operational'
      })
      next()
    }
  }

  static getAccessToken () {
    return async (req, res, next) => {
      const tokenData = JSON.parse(req.headers.token)
      UserService.getAccessToken(tokenData.username)
        .then((response) => {
          res.status(HttpResponse.OK).json({
            status: true,
            response
          })
          next()
        })
        .catch((errorObject) => {
          console.log(errorObject)
          const errorResponse = JSON.parse(serverErrorResponse)
          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static getUserAccountByName () {
    return async (req, res, next) => {
      const { username } = req.params
      UserService.getUserAccountByName(username)
        .then((response) => {
          if (response.length === 0) throw new Error('BadUsernameError')
          res.status(HttpResponse.OK).json({
            status: true,
            response
          })
          next()
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse)

          if (errorObject.message === 'BadUsernameError') {
            errorResponse.statusCode = HttpResponse.NOT_FOUND
            errorResponse.response.message = 'No such Username found!'
          }

          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static getUserAccounts () {
    return async (req, res, next) => {
      UserService.getUserAccounts()
        .then((response) => {
          res.status(HttpResponse.OK).json({
            status: true,
            response
          })
          next()
        })
        .catch(() => {
          const errorResponse = JSON.parse(serverErrorResponse)

          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static updateUserAccountByName () {
    return async (req, res, next) => {
      const { username } = req.params
      const { password } = req.body
      UserService.updateUserAccountByName(username, password)
        .then((response) => {
          if (!response) throw new Error('BadUsernameError')

          res.status(HttpResponse.OK).json({
            status: true,
            response
          })
          next()
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse)

          if (errorObject.message === 'ValidationError') {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST
            errorResponse.response.message = 'Password is missing!'
          } else if (errorObject.message === 'BadUsernameError') {
            errorResponse.statusCode = HttpResponse.NOT_FOUND
            errorResponse.response.message = 'No such Username found!'
          }

          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }

  static deleteUserAccountByName () {
    return async (req, res, next) => {
      const { username } = req.params
      UserService.deleteUserAccountByName(username)
        .then((response) => {
          if (response.deletedCount === 0) throw new Error('BadUsernameError')
          res.status(HttpResponse.OK).json({
            status: true,
            response
          })
          next()
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse)

          if (errorObject.message === 'BadUsernameError') {
            errorResponse.statusCode = HttpResponse.NOT_FOUND
            errorResponse.response.message =
              'Invalid username supplied for deletion!'
          }

          res.status(errorResponse.statusCode).json(errorResponse.response)
        })
    }
  }
}
