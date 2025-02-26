# Sara7a App - Backend

## Description
Sara7a App is a backend service for an anonymous messaging platform. It is built using **Node.js** and **Express.js**, with **MongoDB** as the database. This API allows users to register, log in, and send anonymous messages securely.

## Features
- User authentication (Signup/Login) using JWT
- Secure password hashing with bcrypt.js
- Send and receive anonymous messages
- MongoDB for data storage with Mongoose ORM
- Input validation and error handling with joi

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **nodemailer** (for sending emails)
- **bcrypt.js** (for password hashing)
- **dotenv** (for environment variable management)
- **multer** (for file upload)
- **joi** (for input validation)

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/adel-eleraky/sara7a_app.git
cd sara7a_app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO_URL=your_mongodb_connection_string
MONGO_PASS=MongoDB_password
NODE_ENV=development
PORT=3000
ENCRYPTION_KEY=test
JWT_COOKIE_EXPIRE_IN=90

JWT_SECRET=sara7a_json_web_token
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_USERNAME=mailtrap_username
EMAIL_PASSWORD=mailtrap_pass
EMAIL_PORT=587
```

### 4. Start the Server
```sh
npm run dev
```
The server will run on `http://localhost:3000/`

