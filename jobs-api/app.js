require("dotenv").config();
require("express-async-errors");
//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authenticationMiddleware = require("./middleware/authentication");

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimit());

//routes
app.use(express.static("./public"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

const start = async () => {
  try {
    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(console.log("Connected to database"));
    app.listen(port, console.log(`Server listening on localhost ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
