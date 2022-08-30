
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { hashPassword, verifyHashPassword, createJwtToken } from './authentication.service.js';

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
    const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)

    if (!isEnteredPasswordValid)
      throw ("errr")
    
    return createJwtToken(username)
  };


  static async getUserByName(username) {
    return Helper.list(UserModel, { username })
  };

  static async getUsers() {
    return Helper.list(UserModel, {})
  };

  static async updateUserByName(username, password) {
    const hashedPassword = await hashPassword(password)
    return Helper.updateOne(UserModel, { username }, { password: hashedPassword }, { new: true })

  };

  static async deleteUserByName(username) {
    return Helper.deleteOne(UserModel, { username })
  };
}
