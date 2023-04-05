import { model, Schema } from "mongoose";

const Todo = model("todos", {
  name: String,
  status: {
    type: String,
    enum: ["In Progress", "Done", "Todo"],
    default: "Todo",
  }, 
  userId: {
    type: Schema.ObjectId,
    ref: "users",
    required: true,
  }
});

export default Todo;
