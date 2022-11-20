const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation.model");
const User = require("../models/user.model");
const verifyToken = require("../middleware/verify-token");

router.get("/", verifyToken, async function (req, res) {
  let user = await User.findOne({ _id: req.decoded._id });
  try {
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:username", verifyToken, async function (req, res) {
  let user = await User.findOne({ _id: req.decoded._id });
  try {
    const users = await User.find({
      username: { $regex: req.params.username, $options: "$i" },
    }).exec();
    res.json({
      status: "success",
      data: users.filter((item) => String(item._id) !== String(user._id)),
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/detail/:id", async function (req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).send();
      return;
    } else {
      res.json({
        status: "success",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});



module.exports = router;
