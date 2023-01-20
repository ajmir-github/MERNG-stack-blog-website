const mongoose = require("mongoose");
const { hashPassword } = require("../server/utils/encrypt");
const { Collections, Roles, RolesEnums } = require("./utils");

// ----------------- USER MODEL
const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: { type: String, default: "1234" },
    role: { type: String, enum: RolesEnums, default: Roles.user },
    name: String,
    country: String,
    links: {
      facebook: String,
      instagram: String,
      gmail: String,
      github: String,
      youtube: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("update", function () {
  this.set({ updatedAt: new Date() });
});

UserSchema.pre("save", async function () {
  // only hash the password
  if (this.isModified("password"))
    this.password = await hashPassword(this.password);
});

const UserModel = mongoose.model(Collections.user, UserSchema);

// ----------------- POST MODEL
const PostSchema = new mongoose.Schema({
  title: String,
  category: String,
  keywords: [String],
  description: String,
  body: String,
  comments: [
    {
      author: {
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: Collections.user },
        name: String,
        email: String,
      },
      body: String,
    },
  ],
  published: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: Collections.user,
  },
  views: {
    type: Number,
    default: 0,
  },
});
const PostModel = mongoose.model(Collections.post, PostSchema);

// ----------------- EXPORTS

module.exports = {
  UserModel,
  PostModel,
};
