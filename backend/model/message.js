
const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    conversationId: { // hội thoại 
      type: String,
    },
    text:{
      type: String,
    },
    sender: { // người gửi 
      type: String,
    },
    images: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messagesSchema);
