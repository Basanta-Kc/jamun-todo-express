const mongoose = require("mongoose");

const Todo = mongoose.model("users", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

module.exports = Todo;
