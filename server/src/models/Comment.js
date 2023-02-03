const mongoose = require("mongoose");
const toJson = require("@meanie/mongoose-to-json");

const { Collections, updateDate } = require("./utils");

// ----------------- COMMENT
const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Collections.post,
      required: true,
      index: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Collections.user,
    },
    externalAuthor: {
      name: String,
      email: String,
    },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

CommentSchema.pre("update", updateDate);
CommentSchema.plugin(toJson);

// ----------------- EXPORTS

module.exports = mongoose.model(Collections.comment, CommentSchema);
