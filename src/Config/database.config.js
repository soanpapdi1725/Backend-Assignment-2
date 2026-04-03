import mongoose from "mongoose";
import "dotenv/config";
import { Pool } from "pg";

// database name in postgres: Users-DB
export const pgPool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Tasks-DB",
    });
    console.log("mongoDB is connected");
  } catch (error) {
    console.log("MongoDB is not connected");
    console.log("Encountered with error in mongoDB", error.message);
    process.exit(1);
  }
};

export const connectPostgres = async () => {
  try {
    const result = await pgPool.query("SELECT current_database()");
    console.log(`The Database name is ${result.rows[0].current_database}`)
    console.log("Postgres is connected");
  } catch (error) {
    console.log("Encountered with error in postgresSQL", error.message);
    process.exit(1);
  }
};
