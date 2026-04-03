import { pgPool } from "../../Config/database.config";

// createUser function is Registering User in our postgres Database
export const createUser = async (firstName, lastName, email, password) => {
  const query = `INSERT INTO users
  (firstName, lastName, email, password) 
  VALUES ($1, $2, $3, $4) RETURNING id, email`;
  const values = [firstName, lastName, email, password];

  const result = await pgPool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pgPool.query(query, [email]);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const result = await pgPool.query(query, [id]);
  return result.rows[0];
};

