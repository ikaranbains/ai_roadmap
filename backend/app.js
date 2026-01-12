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
    origin: (origin, cb) => {
      // allow curl/postman/no-origin
      if (!origin) return cb(null, true);

      const allowed = [
        process.env.CLIENT_ORIGIN,
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
      ].filter(Boolean);

      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked origin: ${origin}`));
    },
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
