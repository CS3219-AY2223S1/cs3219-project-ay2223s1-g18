import UserService from "../services/users.service.js";
import { HttpResponse } from "../../constants/httpResponse.js";

const serverErrorResponse = JSON.stringify({
  statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
  response: {
    status: false,
    message: "Error in request fulfilment!",
  },
});
// User signup
export function sendUserConfirmationToken(req, res) {
  const { email, username, password } = req.body;
  UserService.createUserVerificationRequest(email, username, password)
    .then(() => {
      return res.status(HttpResponse.ACCEPTED).json({
        status: true,
        response: { message: `Successfully sent token email!` },
      });
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
        errorResponse.statusCode = HttpResponse.CONFLICT;
        errorResponse.response.message = "Email or username has been taken.";
      }

      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};

export function completeUserSignup(req, res) {
  UserService.completeUserSignup(req.locals.tokenData)
    .then((response) => {
      return res.status(HttpResponse.CREATED).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      // TODO: user already added
      console.log(errorObject)
      const errorResponse = JSON.parse(serverErrorResponse);
      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};

// User password reset
export function  sendResetPasswordToken(req, res) {
  const { email } = req.body;
  UserService.createResetVerificationRequest(email)
    .then(() => {
      return res.status(HttpResponse.ACCEPTED).json({
        status: true,
        response: { message: `Successfully sent token email!` },
      });
    })
    .catch((errorObject) => {
      console.log(errorObject)
      const errorResponse = JSON.parse(serverErrorResponse);

      if (errorObject.name == "ValidationError") {
        errorResponse.statusCode = HttpResponse.BAD_REQUEST;
        errorResponse.response.message =
          "No such user with email found!";
      } 
      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};

export function completePasswordReset(req, res) {
  const { password } = req.body;
  UserService.completePasswordReset(req.locals.tokenData, password)
    .then((response) => {
      if (!response) throw { name: "BadUsernameError" };

      return res.status(HttpResponse.OK).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse);

      if (errorObject.name == "ValidationError") {
        errorResponse.statusCode = HttpResponse.BAD_REQUEST;
        errorResponse.response.message = "Password is missing!";
      } 

      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};


// User authentication
export function  authenticateUser(req, res) {
  const { username, password } = req.body;
  UserService.authenticateUser(username, password)
    .then((response) => {
      return res.status(HttpResponse.OK).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {

      const errorResponse = JSON.parse(serverErrorResponse);
      if (errorObject.name == "ValidationError") {
        errorResponse.statusCode = HttpResponse.BAD_REQUEST;
        errorResponse.response.message =
          "Username and/or Password are missing!";
      } 

      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};

export function getHealthStatus(req, res) {
  res.status(HttpResponse.OK).json({
    status: "true",
    response: "operational",
  });
};

export function getUserByName(req, res) {
  const { username } = req.params;
  UserService.getUserByName(username)
    .then((response) => {
      if (response.length == 0) throw { name: "BadUsernameError" };
      return res.status(HttpResponse.OK).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse);

      if (errorObject.name == "BadUsernameError") {
        errorResponse.statusCode = HttpResponse.NOT_FOUND;
        errorResponse.response.message = "No such Username found for update!";
      } 

      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};

export function getUsers(req, res) {
  UserService.getUsers()
    .then((response) => {
      return res.status(HttpResponse.OK).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {

      const errorResponse = JSON.parse(serverErrorResponse);

      if (errorObject.name == "BadUsernameError") {
        errorResponse.statusCode = HttpResponse.NOT_FOUND;
        errorResponse.response.message = "No such Username found for update!";
      } 

      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};

export function  updateUserByName (req, res) {
  const { username } = req.params;
  const { password } = req.body;
  UserService.updateUserByName(username, password)
    .then((response) => {
      if (!response) throw { name: "BadUsernameError" };

      return res.status(HttpResponse.OK).json({
        status: true,
        response,
      });
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

      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};

export function deleteUserByName(req, res) {
  const { username } = req.params;
  UserService.deleteUserByName(username)
    .then((response) => {
      if (response.deletedCount == 0) throw { name: "BadUsernameError" };
      return res.status(HttpResponse.OK).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse);
      
      if (errorObject.name == "BadUsernameError") {
        errorResponse.statusCode = HttpResponse.NOT_FOUND;
        errorResponse.response.message =
          "Invalid username supplied for deletion!";
      } 

      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
};

