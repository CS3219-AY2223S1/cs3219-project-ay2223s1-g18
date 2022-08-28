
import connectdb from '../../database/connect.js'
import Helper from '../../database/helper.js'
import UserModel from '../models/users.model.js'

export default class UserService {
  constructor() {
    try {
      console.log(101)
      connectdb.connect();
    } catch (e) {
      console.error(e);
    }
  }

  createUser = async (email, name, password) => {
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

  authenticateUser = async (name, password) => {
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

  getUserById = async (id) => {
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

  getUsers = async () => {
    return new Promise((resolve, reject) => {
      Helper
        .list(UserModel, {})
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };

  updateUser = async (name, email) => {
    return new Promise((resolve, reject) => {
      Helper
        .update(UserModel, { email: email, name: name }, null, { new: true })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  };

  deleteUser = async (id) => {
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
