const express = require("express");
const router = express.Router();
const Message = require("../models/message.model");

router.post("/", async function (req, res) {
  try {
    const data = {
      conversationId: req.body.conversationId,
      text: req.body.text,
      sender: req.body.sender,
    };
    
    const savedMessage = await Message.create(data);

    res.json({
      status: "success",
      data: savedMessage,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:conversationId", async function (req, res) {
  try {
    const message = await Message.find({
        conversationId: req.params.conversationId
    })

    res.json({
      status: "success",
      data: message,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
