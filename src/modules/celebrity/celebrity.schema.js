const mongoose = require("mongoose");
const uuid = require("uuid");

const celebritySchema = new mongoose.Schema({
  id: { type: String, required: true, default: () => uuid.v4(), index: true },
  name: { type: String, required: true },
  content: { type: String, required: false },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

module.exports = mongoose.model("celebrity", celebritySchema);
