
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { hashPassword, verifyHashPassword, createJwtToken, sendValidationEmailRequest } from './authentication.service.js';
import { RESET_PASSWORD_MESSAGE, SIGNUP_MESSAGE } from '../../mailer/message.js'

export default class UserService {

  static async createUserVerificationRequest(email, username, password) {
    if (!email || !username || !password)
      throw ({ name: 'ValidationError' })

    const matchingUser = await Helper.listOne(UserModel, { $or: [{ username }, { email }] })
    if (matchingUser)
      throw ({ name: 'ExistingUserError' })

    const hashedPassword = await hashPassword(password)
    await sendValidationEmailRequest({ email, username, password: hashedPassword }, SIGNUP_MESSAGE, true);
  };

  static async completeUserSignup(tokenData) {
    const user = await Helper.save(UserModel, {
      username: tokenData.username,
      email: tokenData.email,
      password: tokenData.password
    })
    return { user };
  }

  static async createResetVerificationRequest(email) {
    const user = await Helper.list(UserModel, { email })
    if (!user)
      throw ({ name: "ValidationError" })

    await sendValidationEmailRequest({ email, username: user.username }, RESET_PASSWORD_MESSAGE);
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
    return createJwtToken({ username }, false);
  };

  static async getUserByName(username) {
    return await Helper.list(UserModel, { username })
  };

  static async getUsers() {
    return await Helper.list(UserModel, {})
  };
  
  static async updateUserByName(username, password) {
    if (!password)
      throw ({ name: "ValidationError" })
    const hashedPassword = await hashPassword(password)
    const updateResult = await Helper.updateOne(UserModel, { username }, { password: hashedPassword }, { new: true })
    return updateResult
  };

  static async deleteUserByName(username) {
    const deleteResult = await Helper.deleteOne(UserModel, { username })
    return deleteResult
  };
}
