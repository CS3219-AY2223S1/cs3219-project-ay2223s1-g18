import UserService from "../services/users.service.js";
import { HttpResponse } from "../../constants/httpResponse.js";

const serverErrorResponse = JSON.stringify({
  statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
  response: {
    status: false,
    message: "Error in request fulfilment!",
  },
});

export class TokenController {
  static sendUserConfirmationToken() {
    return async (req, res, next) => {
      const { email, username, password } = req.body;
      UserService.createUserVerificationRequest(email, username, password)
        .then(() => {
          res.status(HttpResponse.ACCEPTED).json({
            status: true,
            response: { message: `Successfully sent token email!` },
          });
          next();
        })
        .catch((errorObject) => {
          console.log(errorObject)
          const errorResponse = JSON.parse(serverErrorResponse);
    
          if (errorObject.name == "ValidationError") {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST;
            errorResponse.response.message =
              "Email, Username and/or Password are missing!";
          } else if (errorObject.name == "ExistingUserError") {
            // Duplicate Error
            errorResponse.statusCode = HttpResponse.BAD_REQUEST;
            errorResponse.response.message = "Email or username has been taken.";
          }
    
          res.status(errorResponse.statusCode).json(errorResponse.response);
        });
    }
  }

  static completeUserSignup() {
    return async (req, res, next) => {
      UserService.completeUserSignup(req.locals.tokenData)
      .then((response) => {
        res.status(HttpResponse.CREATED).json({
          status: true,
          response,
        });
        next();
      })
      .catch((errorObject) => {
        // TODO: user already added
        console.log(errorObject)
        const errorResponse = JSON.parse(serverErrorResponse);
        return res.status(errorResponse.statusCode).json(errorResponse.response);
      });
    }
  }

  static sendResetPasswordToken() {
    return async (req, res, next) => {
      const { email } = req.body;
      UserService.createResetVerificationRequest(email)
        .then(() => {
          res.status(HttpResponse.ACCEPTED).json({
            status: true,
            response: { message: `Successfully sent token email!` },
          });
          next();
        })
        .catch((errorObject) => {
          console.log(errorObject)
          const errorResponse = JSON.parse(serverErrorResponse);
    
          if (errorObject.name == "ValidationError") {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST;
            errorResponse.response.message =
              "No such user with email found!";
          } 
          res.status(errorResponse.statusCode).json(errorResponse.response);
        });
    }
  }

  static completePasswordReset() {
    return async (req, res, next) => {
      const { password } = req.body;
      UserService.completePasswordReset(req.locals.tokenData, password)
        .then((response) => {
          if (!response) throw { name: "BadUsernameError" };
    
          res.status(HttpResponse.OK).json({
            status: true,
            response,
          });
          next();
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse);
    
          if (errorObject.name == "ValidationError") {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST;
            errorResponse.response.message = "Password is missing!";
          } 
    
          res.status(errorResponse.statusCode).json(errorResponse.response);
        });
      
    }
  }

  static authenticateUser() {
    return async (req, res, next) => {
      const { username, password } = req.body;
      UserService.authenticateUser(username, password)
        .then((response) => {
          res.status(HttpResponse.OK).json({
            status: true,
            response,
          });
          next();
        })
        .catch((errorObject) => {
    
          const errorResponse = JSON.parse(serverErrorResponse);
          if (errorObject.name == "ValidationError") {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST;
            errorResponse.response.message =
              "Username and/or Password are missing!";
          } 
    
          res.status(errorResponse.statusCode).json(errorResponse.response);
        });
      
    }
  }

  static getHealthStatus() {
    return async (req, res, next) => {
      res.status(HttpResponse.OK).json({
        status: "true",
        response: "operational",
      });
      next();
    }
  }

  static getAccessToken() {
    return async (req, res, next) => {
      UserService.getAccessToken(req.locals.tokenData.username)
        .then((response) => {
          res.status(HttpResponse.OK).json({
            status: true,
            response,
          });
          next();
        })
        .catch((errorObject) => {
    
          const errorResponse = JSON.parse(serverErrorResponse);    
          res.status(errorResponse.statusCode).json(errorResponse.response);
        });
      
    }
  }

  static getUserByName() {
    return async (req, res, next) => {
      const { username } = req.params;
      UserService.getUserByName(username)
        .then((response) => {
          if (response.length == 0) throw { name: "BadUsernameError" };
          res.status(HttpResponse.OK).json({
            status: true,
            response,
          });
          next();
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse);
    
          if (errorObject.name == "BadUsernameError") {
            errorResponse.statusCode = HttpResponse.NOT_FOUND;
            errorResponse.response.message = "No such Username found for update!";
          } 
    
          res.status(errorResponse.statusCode).json(errorResponse.response);
        });
      
    }
  }

  static getUsers() {
    return async (req, res, next) => {
      UserService.getUsers()
      .then((response) => {
        res.status(HttpResponse.OK).json({
          status: true,
          response,
        });
        next();
      })
      .catch((errorObject) => {
  
        const errorResponse = JSON.parse(serverErrorResponse);
  
        if (errorObject.name == "BadUsernameError") {
          errorResponse.statusCode = HttpResponse.NOT_FOUND;
          errorResponse.response.message = "No such Username found for update!";
        } 
  
        res.status(errorResponse.statusCode).json(errorResponse.response);
      });
      
    }
  }
  
  static updateUserByName() {
    return async (req, res, next) => {
      const { username } = req.params;
      const { password } = req.body;
      UserService.updateUserByName(username, password)
        .then((response) => {
          if (!response) throw { name: "BadUsernameError" };
    
          res.status(HttpResponse.OK).json({
            status: true,
            response,
          });
          next();
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse);
          
          if (errorObject.name == "ValidationError") {
            errorResponse.statusCode = HttpResponse.BAD_REQUEST;
            errorResponse.response.message = "Password is missing!";
          } else if (errorObject.name == "BadUsernameError") {
            errorResponse.statusCode = HttpResponse.NOT_FOUND;
            errorResponse.response.message = "No such Username found for update!";
          } 
    
          res.status(errorResponse.statusCode).json(errorResponse.response);
        });
      
    }
  }

  static deleteUserByName() {
    return async (req, res, next) => {
      const { username } = req.params;
      UserService.deleteUserByName(username)
        .then((response) => {
          if (response.deletedCount == 0) throw { name: "BadUsernameError" };
          res.status(HttpResponse.OK).json({
            status: true,
            response,
          });
          next();
        })
        .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse);
          
          if (errorObject.name == "BadUsernameError") {
            errorResponse.statusCode = HttpResponse.NOT_FOUND;
            errorResponse.response.message =
              "Invalid username supplied for deletion!";
          } 
    
          res.status(errorResponse.statusCode).json(errorResponse.response);
        });
      
    }
  }

}

