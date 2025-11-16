const express = require("express");
const app = express();
const dataRouter = require("./routes/data.routes");
const userRouter = require("./routes/user.routes");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./utils/db");
connectToDB();

//cookie setup
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//post method setup
app.use(express.json());
app.use(express.urlencoded({ limit: "16kb" }));

//CORS
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//logger
const morgan = require("morgan");
app.use(morgan("dev"));

//all routes
app.use("/api", dataRouter);
app.use("/user", userRouter);

module.exports = app;
