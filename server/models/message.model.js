const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    conversationId: {type: Schema.Types.ObjectId, ref: "Conversation"},
    sender: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
