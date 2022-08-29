
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { hashPassword, verifyHashPassword, createJwtToken } from './authentication.service.js';

export default class UserService {

  static async createUser(email, name, password) {
    const hashedPassword = await hashPassword(password)
    return new Promise((resolve, reject) => {
      Helper
        .save(UserModel, {
          name,
          email,
          password: hashedPassword
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };

  static async authenticateUser(name, password) {
    return new Promise((resolve, reject) => {
      Helper
        .listOne(UserModel, { name: name }
        )
        .then((res) => {
          if(res) {
            verifyHashPassword(password, res.password)
            .then((isEnteredPasswordValid) => {
              if(isEnteredPasswordValid)
              resolve(createJwtToken(name))
            })
            .catch((e) => console.error(e));
          }
          else
            reject("error")
        })
        .catch((e) => reject(e));
      });
  };


  static async getUserById(id) {
    return new Promise((resolve, reject) => {
      Helper
        .list(UserModel, {
          userId: id,
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

  static async updateUser(id, name, password) {
    const hashedPassword = await hashPassword(password)
    return new Promise((resolve, reject) => {
      Helper
        .updateOne(UserModel, { userId: id }, { name: name, password: hashedPassword }, { new: true })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };

  static async deleteUser(id) {
    return new Promise((resolve, reject) => {
      Helper
        .deleteOne(UserModel, { userId: id })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };
}
