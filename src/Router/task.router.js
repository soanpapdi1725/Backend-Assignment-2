import express from "express";
import { createTask } from "../controllers/tasks.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";

const taskRouter = express.Router();

// Create Tasks -> (POST) Request -> req.body will have the data
taskRouter.post("/create", isAuthorized, createTask);

export default taskRouter;
