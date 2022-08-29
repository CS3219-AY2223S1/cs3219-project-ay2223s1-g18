import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDatabase from "./database/connect.js";
import UserRouter from "./users/routes/users.route.js";

const port = process.env.USER_PORT || 8000;

const app = express();

app.use(cors()); // config cors so that front-end can use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

const router = express.Router();

app.use("/users", UserRouter);

// Controller will contain all the User-defined Routes - To be deleted
import { createUser } from "./controller/user-controller.js";
router.get("/", (_, res) => res.send("Hello World from user-service"));
router.post("/", createUser);
app.use("/api/user", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

try {
  connectDatabase();
} catch (e) {
  console.error(e);
}

app.listen(port, () => console.log("User-Service listening on Port", port));
