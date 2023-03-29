const mongoose = require("mongoose");

const Todo = mongoose.model("todos", {
  name: String,
  status: {
    type: String,
    enum: ["In Progress", "Doing", "Done"],
    default: "In Progress",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = Todo;
