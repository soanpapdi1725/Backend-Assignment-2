// External Modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Local Modules
import { createUser, findUserByEmail } from "../models/Postgres/user.model.js";
import { sendResponse } from "../Utils/sendResponse.utils.js";

// Not used Express Validator because i want to send Status code
// Register Controller
export const postRegister = async (req, res) => {
  try {
    // firstName, lastName, email, password come from req.body
    console.log(req.body);
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    // are they empty or not if true then response 400
    if (!firstName || !email || !password || !confirmPassword) {
      return sendResponse(res, 400, false, "Fields cannot be empty");
    }
    // validation of them are correct or not response 400
    // if they are correct
    // check Password and ConfirmPassword are matching or not
    if (password !== confirmPassword) {
      return sendResponse(
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
    return sendResponse(res, 200, true, "User Registered Successfully");
  } catch (error) {
    console.log(`Error Occurred at registration: Error ${error.message}`);
    return sendResponse(
      res,
      500,
      false,
      `Registration Failure, Please Try Again...`,
    );
  }
};
// Login Controller
export const postLogin = async (req, res) => {
  try {
    // get email and password from req.body
    const { email, password } = req.body;
    // are they empty or not?
    if (!email || !password) {
      return sendResponse(res, 400, false, "Fields are empty");
    }
    // if they are not empty are they written correctly?
    // check user exist in our DB or not
    const user = await findUserByEmail(email);
    // if not then send response that register first
    if (!user) {
      return sendResponse(res, 403, false, "User is not registered with us");
    }
    console.log(user);
    // if he is registered with us then compare his hashed password
    const isCorrectPass = await bcrypt.compare(password, user.password);
    if (!isCorrectPass) {
      return sendResponse(res, 401, false, "Password is incorrect");
    }
    // if password is also correct then sign jwt token and put payload of his id and email
    const payload = {
      email: user.email,
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.token = token;
    user.password = undefined;
    const options = {
      expires: new Date(1000 * 60 * 60 * 24 * 7),
      httpOnly: true,
    };
    // send userObject after making password undefined in cookie
    // send token, name, email in data too
    // send response 200 with user successfully logged in
    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "User logged in Successfully",
      data: user,
    });
  } catch (error) {
    console.log(`Error Occurred at Login: Error ${error.message}`);
    return sendResponse(res, 500, false, `Login Failure, Please Try Again...`);
  }
};
