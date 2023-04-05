import express from "express";
const router = express.Router();
import { signIn, signUp } from "../controller/auth.controller.js";
import { validateSignUp, validateSignIn } from "../validator/auth.validator.js";

router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);

export default router;
