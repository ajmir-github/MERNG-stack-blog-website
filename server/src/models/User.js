const mongoose = require("mongoose");
const toJson = require("@meanie/mongoose-to-json");

const { Collections, Roles, RolesEnums, updateDate } = require("./utils");

// ----------------- USER MODEL
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      private: true,
    }, // this private
    password: { type: String, required: true, private: true },
    role: { type: String, enum: RolesEnums, default: Roles.user },
    name: { type: String, required: true },
    title: {
      type: String,
      index: true,
    },
    country: String,
    bio: String,
    profile: String,
    links: {
      // there are public
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
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

// Middlewares

UserSchema.pre("update", updateDate);
UserSchema.plugin(toJson);

// ----------------- EXPORTS

module.exports = mongoose.model(Collections.user, UserSchema);
