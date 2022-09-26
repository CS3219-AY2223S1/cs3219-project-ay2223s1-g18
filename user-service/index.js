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


app.listen(port, () => console.log("User-Service listening on Port", port));
