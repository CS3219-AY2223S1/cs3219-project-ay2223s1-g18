import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import Helper from '../../database/helper.js'
import { sendValidationEmailRequest } from '../../mailer/process.js'
import { RESET_PASSWORD_MESSAGE, SIGNUP_MESSAGE } from '../../mailer/message.js'
import { JwtSecrets } from '../../constants/jwtSecrets.js'

const HASH_SALT_ROUNDS = 11

export default class AuthService {
  // static async createUserVerificationRequest (email, username, password) {
  //   if (!email || !username || !password) { throw new Error({ name: 'ValidationError' }) }

  //   const matchingUser = await Helper.listOne(UserModel, { $or: [{ username }, { email }] })
  //   if (matchingUser) { throw new Error({ name: 'ExistingUserError' }) }

  //   const tokenDetails = { email, username, password }
  //   const verificationToken = createJwtToken(tokenDetails, JwtSecrets.VERIFICATION, process.env.VERIFICATION_TOKEN_EXPIRY)

  //   await sendValidationEmailRequest(tokenDetails, SIGNUP_MESSAGE, verificationToken, true)
  // };

  static async completePasswordReset (tokenData, password) {
    if (!password) { throw new Error({ name: 'ValidationError' }) }
    const hashedPassword = await hashPassword(password)
    return await Helper.updateOne(UserModel, { email: tokenData.email }, { password: hashedPassword }, { new: true })
  };

  // static async authenticateUser (username, password) {
  //   // const matchingUser = await Helper.listOne(UserModel, { username })
  //   if (!matchingUser) { throw new Error({ name: 'BadUsernameError' }) }

  //   const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)
  //   if (!isEnteredPasswordValid) { throw new Error({ name: 'BadPasswordError' }) }
  //   return {
  //     refreshToken: createJwtToken({ username }, JwtSecrets.REFRESH, process.env.REFRESH_TOKEN_EXPIRY),
  //     accessToken: createJwtToken({ username }, JwtSecrets.ACCESS, process.env.ACCESS_TOKEN_EXPIRY)
  //   }
  // };



}

// static async getAccessToken (username) {
//   return {
//     accessToken: createJwtToken({ username }, JwtSecrets.ACCESS, process.env.ACCESS_TOKEN_EXPIRY)
//   }
// };


// async function verifyHashPassword (enteredPassword, storedHashPassword) {
//   return bcrypt.compare(enteredPassword, storedHashPassword)
// };

// function createJwtToken (identifiers, tokenSecret, tokenExpiry) {
//   return jwt.sign(identifiers, tokenSecret, { expiresIn: tokenExpiry })
// };

