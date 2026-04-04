// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// Moved to import

// external Module
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// local Module
import {
  connectMongoDB,
  connectPostgres,
} from "./src/Config/database.config.js";
import { createUserTable } from "./src/data/createUserTable.js";
import authRouter from "./src/Router/auth.router.js";
import taskRouter from "./src/Router/task.router.js";
import profileRouter from "./src/Router/profile.router.js";

//Database connections
await connectMongoDB();
await connectPostgres();
await createUserTable();
//
const PORT = process.env.PORT || 4001;
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // for frontend
    methods: ["GET", "POST", "DELETE", "PUT"], //accepting methods
    allowedHeaders: ["Content-Type", "Authorization"], //headers allowed
  }),
);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/profile", profileRouter);

app.get("/", (req, res) => {
  console.log(`Path: '${req.url}' Method: '${req.method}'`);

  return res.status(200).json({
    message: "Your server is running",
    success: true,
  });
});

app.use((res) => {
  return res.status(404).json({
    message: "Route Not Found",
    success: false,
  });
});
// server running log
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
