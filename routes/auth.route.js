import express from "express";
const router = express.Router();
import { getAuthUser, signIn, signUp } from "../controller/auth.controller.js";
import { validateSignUp, validateSignIn } from "../validator/auth.validator.js";
import protect from "../middleware/auth.middleware.js";

router.get("/user", protect, getAuthUser)
router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);

export default router;
