import jwt from "jsonwebtoken";
import { sendResponse } from "../Utils/sendResponse.utils.js";
import "dotenv/config";
export const isAuthorized = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token =
      req.cookies?.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.replace("Bearer ", "")
        : null);

    console.log("JWT TOKEN: ", token);
    if (!token) {
      return sendResponse(res, 401, false, "Token is missing");
    }

    try {
      // Check token is correct or not using jwt.verfiy

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Value of token ", decodedToken);
      req.user = decodedToken;
    } catch (error) {
      console.log("Error while verifying jwt token", error.message);
      return sendResponse(res, 401, false, "Token is Invalid");
    }
    next();
  } catch (error) {
    console.log("Error while Checking isAuthorized or not: ", error.message);
    return sendResponse(
      res,
      500,
      false,
      "Something went Wrong while validating your token",
    );
  }
};
