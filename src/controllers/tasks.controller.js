// Controllers

import Tasks from "../models/mongoDB/task.model.js";
import { sendResponse } from "../Utils/sendResponse.utils.js";

// 1. Create Task

export const createTask = async (req, res) => {
  try {
    // we will get title, Description, dueDate from req.body

    const { title, description, dueDate } = req.body;

    // we will get userId from req.body.id setted up while cheching isAuthorized
    const userId = req.user.id;

    // Validating UserId, Description, Date that are they empty or not -> taskValidator
    // Checking if Date entered by User is already passed or not if passed then return the response -> taskValidator
    // create Document in the MongoDB
    const task = await Tasks.create({
      createdBy: userId,
      title: title,
      description: description,
      dueDate: dueDate,
    });
    console.log(task);
    // Return response
    return sendResponse(res, 200, true, "Task Created Successfully");
  } catch (error) {
    console.log("Error while Creating Tasks: ", error.message);
    return sendResponse(
      res,
      500,
      false,
      "Failed in Creating Task, Please Try Again",
    );
  }
};
// 2. Get All tasks of a User id

export const getAllTasks = async (req, res) => {
  try {
    // get userId from request.user which is setted up while checking middleWare
    const userId = req.user.id;
    // get all tasks with that userId
    const allTasksByUser = await Tasks.find({ createdBy: userId }).sort({
      createdAt: -1,
    });
    return sendResponse(
      res,
      200,
      true,
      "User Tasks Sent Successfully",
      allTasksByUser,
    );
  } catch (error) {
    console.log("Error while sending All the tasks to user", error.message);
    return sendResponse(res, 500, false, "Failed to retrieve all the tasks");
  }
};

// 3. Get Single Task by Id
export const getTaskById = async (req, res) => {
  try {
    // get TaskId from params
    const { taskId } = req.params;
    const userId = req.user.id;
    // check TaskId in our database using FindOne
    const task = await Tasks.findOne({ _id: taskId, createdBy: userId });
    // if Found then send task details else send 404
    if (!task) {
      return sendResponse(res, 404, false, "Task Not Found");
    }

    return sendResponse(res, 200, true, "Task Sent Successfully");
  } catch (error) {
    console.log("Error while sending the task to user", error.message);
    return sendResponse(res, 500, false, "Failed to retrieve the task");
  }
};
// 4. Update Single Task By Id
export const updateTask = async (req, res) => {
  try {
    // getting task id by params
    const { taskId } = req.params;
    // getting title, description, dueDate from req.body
    const { title, description, dueDate, status } = req.body;

    // getting userId coming from req.user.id which setted up from decodingToken
    const userId = req.user.id;

    if (!description || !dueDate) {
      return sendResponse(res, 400, true, "Fields must be filled");
    }

    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: taskId, createdBy: userId },
      { title, description, dueDate, status },
      { new: true },
    );
    if (!updatedTask) {
      return sendRespons(res, 404, false, "task not found");
    }
    console.log(updatedTask);

    return sendResponse(res, 200, true, "Updated Task Successfully");
  } catch (error) {
    console.log("Error while Updating the task", error.message);
    return sendResponse(res, 500, false, "Failed to update the task");
  }
};
// 5. Delete Single Task By Id
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const deletedTask = await Tasks.findOneAndDelete({
      _id: taskId,
      createdBy: userId,
    });

    if (!deletedTask) {
      return sendResponse(res, 404, false, "Task Not found to delete");
    }

    return sendResponse(res, 200, true, "Task Deleted Successfully");
  } catch (error) {
    console.log("Error while Deleting the task", error.message);
    return sendResponse(res, 500, false, "Failed to delete the task");
  }
};
