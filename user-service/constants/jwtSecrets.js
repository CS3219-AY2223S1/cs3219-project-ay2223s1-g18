import crypto from 'crypto'

export const JwtSecrets = {
    VERIFICATION: crypto.randomBytes(64).toString("hex"),
    ACCESS: crypto.randomBytes(64).toString("hex"),
    REFRESH: crypto.randomBytes(64).toString("hex"),
}