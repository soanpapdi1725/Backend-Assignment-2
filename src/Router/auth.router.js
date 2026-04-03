import express from "express";
import { postLogin, postRegister } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// registration router

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);
export default authRouter;
