import Joi from "joi";
import { sendResponse } from "../Utils/sendResponse.utils.js";

const userSchema = Joi.object({
  firstName: Joi.string().min(1).required().trim().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 1 character long",
    "any.required": "First name is required",
  }),

  lastName: Joi.string().trim().messages({
    "string.base": "Last name must be a string",
  }),

  email: Joi.string().email().required().trim().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(8).required().trim().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm password is required",
    "any.required": "Confirm password is required",
  }),
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }
  next();
};

const taskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .messages({
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "string.min": "Title must be at least 1 character long",
      "any.required": "Title is required",
    }),

  description: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "Description must be a string",
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),

  dueDate: Joi.date()
    .min("now")
    .required()
    .messages({
      "date.base": "Due date must be a valid date",
      "date.min": "Due date cannot be in the past",
      "any.required": "Due date is required",
    }),
});

export const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }
  next();
};
