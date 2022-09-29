import mongoose from 'mongoose'
import { startMongoDatabase } from '../../database/setup.js'

startMongoDatabase(mongoose)
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('User', userSchema)
