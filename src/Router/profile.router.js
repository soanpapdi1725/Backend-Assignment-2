import express from "express";
import { isAuthorized } from "../middlewares/auth.middleware.js";
import { deleteUser, getProfile } from "../controllers/profile.controller.js";

const profileRouter = express.Router();

// getprofile route
profileRouter.get("/", isAuthorized, getProfile);

// deleteUser profile
profileRouter.delete("/deleteUser", isAuthorized, deleteUser);

export default profileRouter;
