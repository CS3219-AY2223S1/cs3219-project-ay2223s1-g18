
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'
import { createJwtToken } from './authentication.service.js';

export default class UserService {

  static async createUser(email, name, password) {
    return new Promise((resolve, reject) => {
      Helper
        .save(UserModel, {
          name,
          email,
          password
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };

  static async authenticateUser(name, password) {
    // TODO: Add verification with database
    return createJwtToken(name);
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
    return new Promise((resolve, reject) => {
      Helper
        .update(UserModel, { userId: id }, { name: name, password: password },  { new: true })
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
