import UserModel from './user-model.js'
import 'dotenv/config'

// Set up mongoose connection
import mongoose from 'mongoose'

const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export async function createUser (params) {
  return new UserModel(params)
}
