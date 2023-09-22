const mongoose = require("mongoose");
const uuid = require("uuid");

const commentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, default: () => uuid.v4(), index: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
    celebrity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "celebrity",
    },
    celebrityId: { type: String, required: true, index: true },
    mbti: { type: String, index: true, required: false },
    enneagram: { type: String, index: true, required: false },
    zodiac: { type: String, index: true, required: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("comment", commentSchema);
