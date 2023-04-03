const mongoose = require("mongoose");

const Todo = mongoose.model("todos", {
  name: String,
  status: {
    type: String,
    enum: ["In Progress", "Done", "Todo"],
    default: "Todo",
  }, 
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  }
});

module.exports = Todo;
