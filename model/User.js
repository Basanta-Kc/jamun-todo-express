import { model } from "mongoose";

const Todo = model("users", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export default Todo;
