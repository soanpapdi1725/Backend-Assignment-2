import express from "express";
import { postLogin, postRegister } from "../controllers/auth.controller.js";
import { validateUser } from "../middlewares/validator.middleware.js";

const authRouter = express.Router();

// Registration Route
authRouter.post("/register", validateUser, postRegister);
// Login Route
authRouter.post("/login", postLogin);

export default authRouter;
