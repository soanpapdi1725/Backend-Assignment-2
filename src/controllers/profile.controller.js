import { deleteUserById, findUserById } from "../models/Postgres/user.model.js";
import { sendResponse } from "../Utils/sendResponse.utils.js";
import Tasks from "../models/mongoDB/task.model.js";

export const getProfile = async (req, res) => {
  try {
    // get userId from request user id setted up while decodeToken
    // email can also be used but i did with userId
    const userId = req.user.id;

    // get User from postgres database

    const profile = await findUserById(userId);

    if (!profile) {
      return sendResponse(
        res,
        404,
        false,
        "profile not found, Register please",
      );
    }
    // make password undefined before sending response

    profile.password = undefined;
    return sendResponse(
      res,
      200,
      true,
      "User profile sent Successfully",
      profile,
    );
  } catch (error) {
    console.log("Error while getting Profile for the user", error.message);
    return sendResponse(
      res,
      500,
      false,
      "Failed to get the profile, please Try Again...",
    );
  }
};

// Not asked in the assignment but doing it as it is good
export const deleteUser = async (req, res) => {
  try {
    // get userId from request user id setted up while decodeToken
    // email can also be used but i did with userId
    const userId = req.user.id;

    // get User from postgres database

    const deletedProfile = await deleteUserById(userId);

    await Tasks.deleteMany({
      createdBy: userId,
    });
    if (!deletedProfile) {
      return sendResponse(res, 404, false, "User not found to delete");
    }

    return sendResponse(res, 200, true, "User Deleted Successfully");
  } catch (error) {
    console.log("Error while Deleting the user", error.message);
    return sendResponse(
      res,
      500,
      false,
      "Failed to Delete the user, please Try Again...",
    );
  }
};
