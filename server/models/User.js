const mongoose = require("mongoose");
const { hashPassword } = require("../utils/encrypt");
const { Collections, Roles, RolesEnums, updateDate } = require("./utils");

// ----------------- USER MODEL
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: RolesEnums, default: Roles.user },
    name: { type: String, required: true },
    country: String,
    bio: String,
    profile: String,
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

// Middlewares

UserSchema.pre("update", updateDate);

UserSchema.pre("save", async function () {
  // only hash the password
  if (this.isModified("password"))
    this.password = await hashPassword(this.password);
});

// ----------------- EXPORTS

module.exports = mongoose.model(Collections.user, UserSchema);
