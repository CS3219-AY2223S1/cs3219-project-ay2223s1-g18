
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { hashPassword, verifyHashPassword, createJwtToken } from './authentication.service.js';

export default class UserService {

  static async createUser(email, username, password) {
    try {
      const hashedPassword = await hashPassword(password)
      console.log(10101)
      return await Helper
      .save(UserModel, {
        username,
        email,
        password: hashedPassword
      })
    } catch(e) {
      console.error(e)
    }
  };

  static async authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
      Helper
        .listOne(UserModel, { username }
        )
        .then((res) => {
          if(res) {
            const result = resolve(verifyHashPassword(password, res.password))
            .then((isEnteredPasswordValid) => {
              if(isEnteredPasswordValid)
              resolve(createJwtToken(username))
            })
            .catch((e) => reject(e));
          }
          else
            throw("Invalid")
        })
        .catch((e) => reject(e));
      });
  };


  static async getUserByName(username) {
    return new Promise((resolve, reject) => {
      Helper
        .list(UserModel, {
          username,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };

  static async getUsers() {
    return new Promise((resolve, reject) => {
      Helper
        .list(UserModel, {})
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };

  static async updateUserByName(username, password) {
    const hashedPassword = await hashPassword(password)
    return new Promise((resolve, reject) => {
      Helper
        .updateOne(UserModel, { username }, { password: hashedPassword }, { new: true })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };

  static async deleteUserByName(username) {
    return new Promise((resolve, reject) => {
      Helper
        .deleteOne(UserModel, { username })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };
}
