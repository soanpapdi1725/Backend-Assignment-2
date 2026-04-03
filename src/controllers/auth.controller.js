import { check } from "express-validator";
import { sendResponse } from "../Utils/handleResponse.Utils";
import { pgPool } from "../Config/database.config";
import { createUser, findUserByEmail } from "../models/Postgres/user.model";

// Not used Express Validator because i want to send Status code

export const register = async (req, res) => {
  try {
    // firstName, lastName, email, password come from req.body
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    // are they empty or not if true then response 400
    if (!firstName || !email || !password || !confirmPassword) {
      return sendResponse(req, res, 400, false, "Fields cannot be empty");
    }
    // validation of them are correct or not response 400
    // if they are correct
    // check Password and ConfirmPassword are matching or not
    if (password !== confirmPassword) {
      return sendResponse(
        req,
        res,
        400,
        false,
        "Password and confirm password are not matching",
      );
    }
    // then check does that email exist in our postgresDB or not
    // if not then send response that you already registered with us response code
    const user = await findUserByEmail(email);
    if (user) {
      return sendResponse(
        req,
        res,
        400,
        false,
        "User is already registered with us",
      );
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // if it doesnot exist then create the entry in database
    const registered = await createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
    );

    console.log(registered);
    // and return the response that user is created
    return sendResponse(req, res, 200, "User Registered Successfully");
  } catch (error) {
    return sendResponse(
      req,
      res,
      500,
      `Error Occurred at registration: Error ${error.message}`,
    );
  }
};
