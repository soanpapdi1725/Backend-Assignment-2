// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// Moved to import

// external Module
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// local Module
import {
  connectMongoDB,
  connectPostgres,
} from "./src/Config/database.config.js";

//Database connections
connectMongoDB();
connectPostgres();

//
const PORT = process.env.PORT || 4001;
const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [], // for frontend
    methods: ["GET", "POST", "DELETE", "PUT"], //accepting methods
    allowedHeaders: ["Content-Type", "Authorization"], //headers allowed
  }),
);
app.use("/", (req, res, next) => {
  console.log(req.url, req.method);
  res.status(200).json({
    message: "Your server is running",
    success: true,
  });
  next();
});

// Routes

// server running log
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
