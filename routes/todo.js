const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todo");

console.log(getTodos, addTodo, updateTodo, deleteTodo);

router.get("/", getTodos);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);
router.post("/", addTodo);

module.exports = router;
