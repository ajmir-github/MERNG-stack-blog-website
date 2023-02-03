const mongoose = require("mongoose");
const toJson = require("@meanie/mongoose-to-json");
const { Collections, updateDate } = require("./utils");

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
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    author: {
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
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

PostSchema.pre("update", updateDate);
PostSchema.plugin(toJson);

PostSchema.virtual("comments", {
  ref: Collections.comment,
  localField: "_id",
  foreignField: "postId",
});

// ----------------- EXPORTS

module.exports = mongoose.model(Collections.post, PostSchema);
