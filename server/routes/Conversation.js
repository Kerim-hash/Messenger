const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation.model");
const User = require("../models/user.model");
const verifyToken = require("../middleware/verify-token")

router.post("/", async function (req, res) {
  try {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    newConversation.save();
   const receiver =   await User.findById(req.body.receiverId)
    res.json({
      status: "success",
      data: newConversation,
      receiver: receiver
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/", verifyToken, async function (req, res) {
  let user = await User.findOne({ _id: req.decoded._id });
  try {
    const conversation = await Conversation.find({
        members: {$in: [user._id]}
    })
    res.json({
        status: 'success',
        data: conversation
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/detail/:id", async function (req, res) {
  try {
    const conversation = await Conversation.findById(req.params.id)
    
    res.json({
        status: 'success',
        data: conversation
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/:id", verifyToken, async function (req, res) {
  try {
    let user = await User.findOne({ _id: req.decoded._id });

    if (user) {
        const conversationId = req.params.id
        const conversation = await Conversation.findById(conversationId)

        if (conversation) {
            if (String(conversation.members[0]) || String(conversation.members[1]) === String(user._id)) {
                conversation.remove()
                res.status(202).send({
                    status: 'success',
                    message: 'Successfully deleted conversation'
                });
            }
            else {
                res.status(403).send()
            }
        } else {
            res.status(404).send()
        }

    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
