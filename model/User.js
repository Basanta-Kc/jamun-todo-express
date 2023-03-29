const mongoose = require("mongoose");
const User = mongoose.model("users", {
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = User;
