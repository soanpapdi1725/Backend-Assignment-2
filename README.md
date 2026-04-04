# Backend Assignment 2 - Conversely.ai

## Demo Video
[Watch the Demo Video](https://drive.google.com/file/d/1tJq9G27g32bmG5CXVZD7sToFOIPPXJRF/view?usp=sharing)

## Docs
[View Postman API Documentation](https://documenter.getpostman.com/view/47277320/2sBXiqDTt3)

## Description
This is an Express.js REST API providing user authentication, task management, and user profiling, utilizing a dual database strategy connecting to both MongoDB and PostgreSQL.

This was developed as the assignment given by Conversely.ai for a Backend Developer Intern role.

## Features
- **User Authentication**: Secure signup and login mechanisms using JWT.
- **User Profiles**: Manage and retrieve user profile details.
- **Task Management**: Endpoints for handling task creation, specific retrievals via routes.
- **Dual Database Strategy**: Designed to operate with both a SQL (PostgreSQL) and a NoSQL (MongoDB) database.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js** (v18.x or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** installed and running on your local machine or a cloud provider.
- **MongoDB** running locally or a cloud instance like MongoDB Atlas.

## Getting Started

Follow these clear instructions to set up and run the application locally.

### 1. Clone the repository
```bash
git clone https://github.com/soanpapdi1725/Backend-Assignment-2.git
cd Backend-Assignment-2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Database Setup

#### PostgreSQL Setup
1. Ensure the PostgreSQL service is running on your system.
2. Open a database command line (like `psql`) or a GUI tool (like pgAdmin).
3. Create a new database for the application to use. In your tool, simply run:
   ```sql
   CREATE DATABASE "Users-DB";
   ```
4. Note your database superuser credentials (typically `postgres` with a password you created upon installing).

#### MongoDB Setup
1. Download, install, and run MongoDB locally, or set up a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Obtain the standard MongoDB Connection String URI.

### 4. Environment Configuration
Create a `.env` file in the root directory of your project. Copy the template below and substitute the placeholder values with your actual database and JWT configurations:

```ini
# Server Configuration
PORT=4000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<your_cluster_address>.mongodb.net/?appName=<Your_App_Name>

# PostgreSQL Configuration
# Format: postgresql://<username>:<password>@<host>:<port>/<database_name>
POSTGRES_URI=postgresql://postgres:<your_db_password>@localhost:5432/Users-DB

# JWT Authentication
JWT_SECRET=your_jwt_secret_key
```

### 5. Running the Application
The initial startup schema is synchronized internally (via `createUserTable()`), so you do not need to construct the SQL tables manually.

To start the server in development mode (using nodemon for hot reloads):
```bash
npm run dev
```

To start the server natively using node:
```bash
npm start
```

You should see logs indicating successful backend connection to both databases, followed by:
```bash
Server running on http://localhost:4000
```

### 6. API Endpoints Outline
Once resolving `http://localhost:4000/`, you can hit the following base routes:

- `API Healthcheck`: `GET /`
- `Authentication Routes`: `/api/v1/auth`
- `Task Routes`: `/api/v1/tasks`
- `Profile Routes`: `/api/v1/profile`

## Folder Structure
```text
Backend-Assignment-2/
├── .env                  # Environment configuration
├── .gitignore            # Git ignored files
├── package.json          # Project metadata and dependencies
├── server.js             # Application entry point
└── src/                  # Source code
    ├── Config/           # Database and application configuration
    ├── controllers/      # Route controllers (logic)
    ├── data/             # Database initialization (e.g. createUserTable.js)
    ├── middlewares/      # Express middlewares (auth, etc)
    ├── models/           # Database models/schemas
    ├── Router/           # Express route definitions
    └── Utils/            # Helper functions and utilities
```
