import { Router } from "express";
const router = Router();
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todo.controller.js";
import protect from "../middleware/auth.middleware.js";
import {
  validateAddTodo,
  validateUpdateTodo,
} from "../validator/todo.validator.js";

router.get("/", protect, getTodos);
router.delete("/:id", protect, deleteTodo);
router.patch("/:id", protect, validateUpdateTodo, updateTodo);
router.post("/", protect, validateAddTodo, addTodo);

export default router;
