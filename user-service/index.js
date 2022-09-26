import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import UserRouter from "./users/routes/users.route.js";

const port = process.env.USER_PORT || 8000;

const app = express();

app.use(cors()); // config cors so that front-end can use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

app.use("/api/user", UserRouter);

// router.post('/', createUser)
// app.use('/api/user', router).all((_, res) => {
//   res.setHeader('content-type', 'application/json')
//   res.setHeader('Access-Control-Allow-Origin', '*')
// })


app.listen(port, () => console.log("User-Service listening on Port", port));
