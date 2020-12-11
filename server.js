"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;
const User = require("./models/userModel");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database connection established"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

const userRouter = require('./routes/userRoute');
app.use("/users", userRouter);

const blogsRouter = require("./routes/blogs");
app.use("/blogs", blogsRouter);

app.listen(port, () => console.log(`Server listening on: ${port}`));

module.exports = app;
