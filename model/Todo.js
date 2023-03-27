const mongoose = require("mongoose");

const Todo = mongoose.model("todos", {
  name: String,
});

module.exports = Todo;
