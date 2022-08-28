
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'


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
    // return new Promise((resolve, reject) => {
    //   Helper
    //     .save(UserModel, {
    //       name,
    //       email,
    //       password
    //     })
    //     .then((res) => {
    //       resolve(res);
    //     })
    //     .catch((e) => reject(e));
    // });
    return { status: "Auth work in progress" }
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

  static async updateUser(name, email) {
    return new Promise((resolve, reject) => {
      Helper
        .update(UserModel, { email: email, name: name }, null, { new: true })
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
