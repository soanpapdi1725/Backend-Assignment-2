import mongoose from "mongoose";
import "dotenv/config";
import { Client } from "pg";



export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Backend-Assignment-DB",
    });
    console.log("mongoDB is connected");
  } catch (error) {
    console.log("MongoDB is not connected");
    console.log("Reason why mongoDb is not connected: ", error);
    process.exit(1);
  }
};

export const connectPostgres = async () => {
  try {
  } catch (error) {}
};
