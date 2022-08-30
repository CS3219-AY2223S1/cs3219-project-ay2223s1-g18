
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { hashPassword, verifyHashPassword, createJwtToken } from './authentication.service.js';

export default class UserService {

  static async createUser(email, username, password) {
    try {
      const hashedPassword = await hashPassword(password)
      console.log(10101)
      return await Helper.save(UserModel, {
        username,
        email,
        password: hashedPassword
      })
    } catch(e) {
      console.error(e)
    }
  };

  static async authenticateUser(username, password) {
    try {
      const matchingUser = await Helper.listOne(UserModel, { username })
      const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)
      
      if(isEnteredPasswordValid)
        return createJwtToken(username)
      else
        throw("errr")
    } catch(e) {
        console.error(e)
    }
  };


  static async getUserByName(username) {
    try {
      return Helper.list(UserModel, {username})
    } catch(e) {
        console.error(e)
    }
  };

  static async getUsers() {
    try {
      return Helper.list(UserModel, {})
    } catch(e) {
        console.error(e)
    }
  };

  static async updateUserByName(username, password) {
    try {
      const hashedPassword = await hashPassword(password)
      return Helper.updateOne(UserModel, { username }, { password: hashedPassword }, { new: true })
    } catch(e) {
        console.error(e)
    }
    
  };

  static async deleteUserByName(username) {
    try {
      return Helper.deleteOne(UserModel, { username })
    } catch(e) {
        console.error(e)
    }
  };
}
