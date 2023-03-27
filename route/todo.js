const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controller/todo");

router.get("/", getTodos);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo)

router.post("/", createTodo)

module.exports = router;
