# Backend Assignment 2 - Conversely.ai

This is the completed backend assignment for the Conversely.ai Backend Developer Intern position. It is built using Node.js, Express, MongoDB (via Mongoose), and PostgreSQL (via pg). 

## Features
- **Express.js API** (built using ES modules)
- **Database Integration:** Supports both MongoDB and PostgreSQL endpoints as per requirements.
- **Authentication:** JWT-based authentication using `jsonwebtoken` and `bcryptjs`.
- **Validation:** Input validation handled via `express-validator`.

---

## 🚀 Setup & Installation Instructions

Follow these instructions to set up and run the application locally on your machine.

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a MongoDB Atlas URI)
- [PostgreSQL](https://www.postgresql.org/download/) (running locally)

### 2. Clone the Repository
```bash
git clone https://github.com/soanpapdi1725/Backend-Assignment-2.git
cd Backend-Assignment-2
```

### 3. Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```

### 4. Database Setup & Configuration
You need to set up environment variables for the application to connect to the databases and configure the server.

Create a `.env` file in the root directory:
```bash
touch .env
```

Add the following configuration to your `.env` file:
```env
PORT=4000

# MongoDB Connection String (Replace with your own if using local DB, e.g., mongodb://localhost:27017/my_database)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?appName=<appName>

# PostgreSQL Connection String 
# Format: postgresql://<username>:<password>@localhost:5432/<database_name>
POSTGRES_URI=postgresql://postgres:your_password@localhost:5432/Users-DB

# Secret key for JWT Authentication
JWT_SECRET=your_super_secret_key_here
```

**Note on PostgreSQL Database:**
Make sure you have PostgreSQL running locally on port `5432`. You will also need to manually create the database referred to in your `POSTGRES_URI` (e.g., `Users-DB`) before starting the app.
You can create the database using the `psql` command line:
```bash
psql -U postgres
CREATE DATABASE "Users-DB";
```

### 5. Start the Application

You can start the server in two ways:

**Development Mode** (uses `nodemon` for hot-reloading when files change):
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

If everything is configured properly, you should see messages indicating that the server is running on `http://localhost:4000` and successfully connected to the databases.
