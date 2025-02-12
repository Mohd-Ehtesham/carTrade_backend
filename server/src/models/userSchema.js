const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [8, "Password must be at least 8 characters long."],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
