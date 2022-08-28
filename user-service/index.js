import express from 'express';
import cors from 'cors';

const database = require("./database/connection");
const users = require("./accounts/routes/users.route");
import { createUser } from './controller/user-controller.js';
const port = process.env.USER_PORT || 3000;

const app = express();

app.use(cors()) // config cors so that front-end can use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors())

const router = express.Router()

app.use("/users", users);


// Controller will contain all the User-defined Routes - To be deleted
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/', createUser)

app.get("/health-check", (req, res) => {
    res.json({
      status: "ok",
    });
  });
  
app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

try {
    database.connection();
  } catch (e) {
    console.error(e);
  }
  

app.listen(port, () => console.log('user-service listening on port:'+ port));