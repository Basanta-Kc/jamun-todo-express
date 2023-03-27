const mongoose = require("mongoose");

const Todo = mongoose.model("todos", {
  name: String,
  status: String,
});

module.exports = Todo