import { pgPool } from "../Config/database.config.js";

export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `;
  try {
    pgPool.query(query);
    console.log("User Table created if not Exists");
  } catch (error) {
    console.log("Error Creating UserTable: ", error);
  }
};
