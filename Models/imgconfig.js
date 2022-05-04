var mongoose = require("mongoose");
var imageSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      minlength: 6,
    },
    like: [
      { userId: { type: String }, date: { type: Date, default: Date.now } },
    ],
    comment: [
      {
        userId: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Image", imageSchema);
