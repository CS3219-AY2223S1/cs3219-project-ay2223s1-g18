import dotenv from 'dotenv'
dotenv.config()

export const JwtSecrets = {
  VERIFICATION: process.env.VERIFICATION_TOKEN_SECRET,
  ACCESS: process.env.ACCESS_TOKEN_SECRET,
  REFRESH: process.env.REFRESH_TOKEN_SECRET
}
