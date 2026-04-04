import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/tasks.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";

const taskRouter = express.Router();

// Create Tasks -> (POST) Request -> req.body will have the data
taskRouter.post("/create", isAuthorized, createTask);

// getAllTasks -> (get) Request
taskRouter.get("/All", isAuthorized, getAllTasks);

// getTaskById -> (get) Request
taskRouter.get("/:taskId", isAuthorized, getTaskById);

// updateTaskById -> (PUT) request
taskRouter.put("/update/:taskId", isAuthorized, updateTask);

// updateTaskById -> (PUT) request
taskRouter.delete("/delete/:taskId", isAuthorized, deleteTask);

export default taskRouter;
