const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"]
    },
    content: String,
    user:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);
