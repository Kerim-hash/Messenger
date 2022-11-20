const express = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();
const registerValidations = require("../validations/register");
const loginValidations = require("../validations/login");
const User = require("../models/user.model");

router.post("/register", registerValidations, async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: "error", errors: errors.array() });
    }

    let foundUserByUserName = await User.findOne({ username: req.body.username }).exec();
    let foundUserByEmail = await User.findOne({ email: req.body.email }).exec();

    console.log(foundUserByUserName)
    console.log(foundUserByEmail)
    if (foundUserByUserName || foundUserByEmail) {
      res.status(400).send({
        success: false,
        message: `User with this ${
          foundUserByUserName ? "username" : "email"
        } already exists`,
      });
    }

   

    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    let token = await jwt.sign(newUser.toJSON(), process.env.SECRET, {
      expiresIn: 604800,
    });

    !foundUserByUserName && !foundUserByEmail && await newUser.save();
    res.json({
      success: true,
      token: token,
      message: "Successfully created a new user",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/login", loginValidations, async function (req, res) {
  try {
    let foundUser = await User.findOne({ email: req.body.email }).exec();

    if (!foundUser) {
      res.status(403).send({
        success: false,
        message: "Authorization failed, User not found",
      });
    } else {
      if (foundUser.comparePassword(req.body.password)) {
        let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
          expiresIn: 604800,
        });
        res.json({
          token: token,
          user: foundUser,
          message: "user successfully logged in",
        });
      } else {
        res.status(403).send({
          success: false,
          message: "Authorization failed, Wrong Password!",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
