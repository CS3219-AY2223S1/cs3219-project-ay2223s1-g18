
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { hashPassword, verifyHashPassword, createJwtToken, analyseJwtToken, blacklistJwtToken, sendValidationEmailRequest } from './authentication.service.js';
import { RESET_PASSWORD_MESSAGE, SIGNUP_MESSAGE } from '../../mailer/message.js'

export default class UserService {

  static async createUserVerificationRequest(email, username, password) {
    if (!email || !username || !password)
      throw ({ name: 'ValidationError' })

    const matchingUser = await Helper.listOne(UserModel, { $or: [{ username }, { email }] })
    if (matchingUser)
      throw ({ name: 'ExistingUserError' })

    const hashedPassword = await hashPassword(password)
    sendValidationEmailRequest({ email, username, password: hashedPassword }, SIGNUP_MESSAGE);
  };

  static async completeUserSignup(token) {
    const tokenData = await analyseJwtToken(token)
    const saveResult = await Helper.save(UserModel, {
      username: tokenData.username,
      email: tokenData.email,
      password: tokenData.password
    })
    await blacklistJwtToken(token, tokenData);
    const sessionToken = createJwtToken({ username }, false);
    return { ...saveResult, token: sessionToken };
  }

  static async getResetPasswordToken(email) {
    const user = Helper.list(UserModel, { email })
    if (!user)
      throw ({ name: "ValidationError" })

    sendValidationEmailRequest({ email, username: user.username }, RESET_PASSWORD_MESSAGE);
  }

  static async completePasswordReset(token, password) {
    if (!password)
      throw ({ name: "ValidationError" })
    const tokenData = await analyseJwtToken(token)
    await blacklistJwtToken(token, tokenData);
    const hashedPassword = await hashPassword(password)
    return Helper.updateOne(UserModel, { username: tokenData.username }, { password: hashedPassword }, { new: true })

  };

  static async authenticateUser(username, password) {
    const matchingUser = await Helper.listOne(UserModel, { username })
    if (!matchingUser)
      throw ({ name: 'BadUsernameError' })

    const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)
    if (!isEnteredPasswordValid)
      throw ({ name: 'BadPasswordError' })

    return createJwtToken({ username }, false);
  };


  static async logoutUser(token) {
    const tokenData = await analyseJwtToken(token, true);
    await blacklistJwtToken(token, tokenData);
  }

  static async getUserByName(token, username) {
    const tokenData = await analyseJwtToken(token)

    return Helper.list(UserModel, { username })
  };

  static async getUsers(token) {
    const tokenData = await analyseJwtToken(token)

    return Helper.list(UserModel, {})
  };
  
  static async updateUserByName(token, username, password) {
    const tokenData = await analyseJwtToken(token, username)
    if (!password)
      throw ({ name: "ValidationError" })
    const hashedPassword = await hashPassword(password)
    const updateResult = Helper.updateOne(UserModel, { username }, { password: hashedPassword }, { new: true })
    return updateResult
  };

  static async deleteUserByName(token, username) {
    const tokenData = await analyseJwtToken(token, username)
    const deleteResult = Helper.deleteOne(UserModel, { username })
    await blacklistJwtToken(token, tokenData);
    return deleteResult
  };
}
