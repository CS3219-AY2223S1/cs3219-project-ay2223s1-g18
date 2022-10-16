import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import AuthRouter from './auth/routes/auth.route.js'
dotenv.config()

const port = process.env.USER_PORT || 8000

const app = express()

app.use(cors()) // config cors so that front-end can use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors())

app.use('/api/user', AuthRouter)

app.listen(port, () => console.log('User-Service listening on Port', port))
