// Controllers

import Tasks from "../models/mongoDB/task.model.js";
import { sendResponse } from "../Utils/sendResponse.utils.js";

// 1. Create Task

export const createTask = async (req, res) => {
  try {
    // we will get UserId, title, Description, dueDate from req.body
    const { userId, title, description, dueDate } = req.body;
    // Validating UserId, Description, Date that are they empty or not
    if (!userId || !description || !dueDate) {
      return sendResponse(res, 400, false, "Required Fields Cannot be Empty");
    }
    // Checking if Date entered by User is already passed or not if passed then return the response
    const taskDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (taskDate < today) {
      return sendResponse(
        res,
        400,
        false,
        "Task of dueDate older than today cannot be Created",
      );
    }
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

export const getAllTasks = async () => {
    
} 
// 3. Get Single Task by Id
// 4. Update Single Task By Id
// 5. Delete Single Task By Id
