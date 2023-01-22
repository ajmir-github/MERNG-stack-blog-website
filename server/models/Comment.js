const mongoose = require("mongoose");
const { Collections, updateDate } = require("./utils");

// ----------------- COMMENT
const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Collections.post,
      required: true,
    },
    internalAuthor: {
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
  }
);

CommentSchema.pre("update", updateDate);

// ----------------- EXPORTS

module.exports = mongoose.model(Collections.comment, CommentSchema);
