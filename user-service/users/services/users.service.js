import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { sendValidationEmailRequest } from '../../mailer/process.js'
import { RESET_PASSWORD_MESSAGE, SIGNUP_MESSAGE } from '../../mailer/message.js'
import { JwtSecrets } from '../../constants/jwtSecrets.js';

export default class UserService {

  static async createUserVerificationRequest(email, username, password) {
    if (!email || !username || !password)
      throw ({ name: 'ValidationError' })

    const matchingUser = await Helper.listOne(UserModel, { $or: [{ username }, { email }] })
    if (matchingUser)
      throw ({ name: 'ExistingUserError' })

    const tokenDetails = { email, username, password }
    const verificationToken = createJwtToken(tokenDetails, JwtSecrets.VERIFICATION, process.env.VERIFICATION_TOKEN_EXPIRY)

    await sendValidationEmailRequest(tokenDetails, SIGNUP_MESSAGE, verificationToken, true);
  };

  static async completeUserSignup(tokenData) {
    const user = await Helper.save(UserModel, {
      username: tokenData.username,
      email: tokenData.email,
      password: await hashPassword(tokenData.password)
    })
    return { user };
  }

  static async createResetVerificationRequest(email) {
    const user = await Helper.list(UserModel, { email })
    if (!user)
      throw ({ name: "ValidationError" })

    const tokenDetails = { email, username: user.username }
    const verificationToken = createJwtToken(tokenDetails, JwtSecrets.VERIFICATION, process.env.VERIFICATION_TOKEN_EXPIRY)

    await sendValidationEmailRequest(tokenDetails, RESET_PASSWORD_MESSAGE, verificationToken);
  }

  static async completePasswordReset(tokenData, password) {
    if (!password)
      throw ({ name: "ValidationError" })
    const hashedPassword = await hashPassword(password)
    return await Helper.updateOne(UserModel, { email: tokenData.email }, { password: hashedPassword }, { new: true })

  };

  static async authenticateUser(username, password) {
    const matchingUser = await Helper.listOne(UserModel, { username })
    if (!matchingUser)
      throw ({ name: 'BadUsernameError' })

    const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)
    if (!isEnteredPasswordValid)
      throw ({ name: 'BadPasswordError' })
    return {
      refreshToken: createJwtToken({ username }, JwtSecrets.REFRESH, process.env.REFRESH_TOKEN_EXPIRY),
      accessToken: createJwtToken({ username }, JwtSecrets.ACCESS, process.env.ACCESS_TOKEN_EXPIRY)
    }
  };


  static async getAccessToken(username) {
    return {
      accessToken: createJwtToken({ username }, JwtSecrets.ACCESS, process.env.ACCESS_TOKEN_EXPIRY)
    }
  };
  static async getUserAccountByName(username) {
    return await Helper.list(UserModel, { username })
  };

  static async getUserAccounts() {
    return await Helper.list(UserModel, {})
  };
  
  static async updateUserAccountByName(username, password) {
    if (!password)
      throw ({ name: "ValidationError" })
    const hashedPassword = await hashPassword(password)
    const updateResult = await Helper.updateOne(UserModel, { username }, { password: hashedPassword }, { new: true })
    return updateResult
  };

  static async deleteUserAccountByName(username) {
    const deleteResult = await Helper.deleteOne(UserModel, { username })
    return deleteResult
  };

}

async function hashPassword(password) {
  return bcrypt.hash(password, parseInt(process.env.HASH_SALT_ROUNDS));
};

async function verifyHashPassword(enteredPassword, storedHashPassword) {
  return bcrypt.compare(enteredPassword, storedHashPassword);
};

function createJwtToken(identifiers, tokenSecret, tokenExpiry) {
  return jwt.sign(identifiers, tokenSecret, { expiresIn: tokenExpiry })
};