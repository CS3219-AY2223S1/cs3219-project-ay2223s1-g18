let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let dotenv = require("dotenv");
dotenv.config();

const UserHistoryRouter = require("./user-history.route");
const port = 8003;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

mongoose.connect(process.env.DB_CLOUD_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB database successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
  throw new Error("Failed to connect to MongoDB database!");
});

app.use("/", UserHistoryRouter);

app.listen(port, () =>
  console.log("User-History-Service listening on Port", port)
);
