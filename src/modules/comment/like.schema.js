const mongoose = require("mongoose");
const uuid = require("uuid");

const likeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, default: () => uuid.v4(), index: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
    userId: { type: String, required: true, index: true },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
    commentId: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("like", likeSchema);
