
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { hashPassword, verifyHashPassword, createJwtToken, analyseJwtToken } from './authentication.service.js';

export default class UserService {

  static async createUser(email, username, password) {
    const hashedPassword = await hashPassword(password)
    return await Helper.save(UserModel, {
      username,
      email,
      password: hashedPassword
    })
  };

  static async authenticateUser(username, password) {
    const matchingUser = await Helper.listOne(UserModel, { username })
    if (!matchingUser)
      throw ({ name: 'BadUsernameError' })

    const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)
    if (!isEnteredPasswordValid)
      throw ({ name: 'BadPasswordError' })

    return createJwtToken(username);
  };


  static async getUserByName(token, username) {
    const tokenDetails = analyseJwtToken(token)

    return Helper.list(UserModel, { username })
  };

  static async getUsers(token) {
    return Helper.list(UserModel, {})
  };

  static async updateUserByName(token, username, password) {
    const tokenDetails = analyseJwtToken(token)
    console.log(tokenDetails)
    if (!password)
      throw ({ name: "ValidationError" })
    const hashedPassword = await hashPassword(password)
    return Helper.updateOne(UserModel, { username }, { password: hashedPassword }, { new: true })

  };

  static async deleteUserByName(token, username) {
    const tokenDetails = analyseJwtToken(token)
    return Helper.deleteOne(UserModel, { username })
  };
}
