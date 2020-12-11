"use strict";

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");

exports.register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

exports.login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res
          .status(401)
          .json({
            message: "Authentication failed. Invalid user or password.",
          });
      }
      return res.json({
        token: jwt.sign(
          { email: user.email, fullName: user.fullName, _id: user._id },
          "RESTFULAPIs"
        ),
      });
    }
  );
};

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};
exports.profile = (req, res, next) => {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
