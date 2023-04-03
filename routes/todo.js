const { celebrate } = require("celebrate");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todo");
const protect = require("../middleware/auth");
const { validateAddTodo, validateUpdateTodo } =
  require("../validator/todo").default;

router.get("/", protect, getTodos);
router.delete("/:id", protect, deleteTodo);
router.patch("/:id", protect, validateUpdateTodo, updateTodo);
router.post("/", protect, validateAddTodo, addTodo);

module.exports = router;
