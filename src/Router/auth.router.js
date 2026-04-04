import express from "express";
import { postLogin, postRegister } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Registration Route
authRouter.post("/register", postRegister);
// Login Route
authRouter.post("/login", postLogin);

export default authRouter;
