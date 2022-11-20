const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    members: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
