const mongoose = require("mongoose");
const { Collections, updateDate } = require("./utils");

// ----------------- COMMENT SUB-DOC
const CommentSchema = new mongoose.Schema(
  {
    author: {
      userId: { type: mongoose.SchemaTypes.ObjectId, ref: Collections.user },
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

// ----------------- POST MODEL
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, index: true },
    keywords: [String],
    description: String,
    thumbnail: String,
    body: {
      type: String,
      required: true,
    },
    comments: [CommentSchema],
    published: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Collections.user,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PostSchema.pre("update", updateDate);

// ----------------- EXPORTS

module.exports = mongoose.model(Collections.post, PostSchema);
