const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minlength: [6, "Minimum password length must be 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
