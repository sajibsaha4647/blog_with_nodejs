const { model, Schema } = require("mongoose");
// const Profile = require('./ProfileModel')
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 30,
      unique: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  { timestamps: true },
);

const UserModel = model("User", userSchema);
module.exports = UserModel