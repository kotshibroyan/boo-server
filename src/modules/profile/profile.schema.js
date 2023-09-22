const mongoose = require("mongoose");
const uuid = require("uuid");

const profileSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, default: () => uuid.v4(), index: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    mbti: { type: String, required: false },
    enneagram: { type: String, required: false },
    variant: { type: String, required: false },
    tritype: { type: Number, required: false },
    socionics: { type: String, required: false },
    sloan: { type: String, required: false },
    psyche: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("profile", profileSchema);
