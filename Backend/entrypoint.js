import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Routes from "./routes/routes";
import Error from "./app/Exceptions/error";
import cors from "cors";

const RateLimit = require("express-rate-limit");
// set up rate limiter: max 5 request per min per ip
var limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
});

require("dotenv").config();

const app = express();

app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(limiter);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", Routes.AccountApiRouter);
app.use("/api/data", Routes.DataApiRouter);

app.use((req, res, next) => {
  const error = new Error("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occurred!",
    success: error.success || false,
  });
});

mongoose
  .connect(
    `mongodb://${process.env.name}:${process.env.password}@cluster0-shard-00-00.kzetf.mongodb.net:27017,cluster0-shard-00-01.kzetf.mongodb.net:27017,cluster0-shard-00-02.kzetf.mongodb.net:27017/${process.env.db}?ssl=true&replicaSet=atlas-r70n7s-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("listening at port", process.env.PORT || 5000);

    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
