// TODO: Remove when auth and user decoupled works in nginx
export const JwtSecrets = {
  VERIFICATION: process.env.VERIFICATION_TOKEN_SECRET,
  ACCESS: process.env.ACCESS_TOKEN_SECRET,
  REFRESH: process.env.REFRESH_TOKEN_SECRET
}
