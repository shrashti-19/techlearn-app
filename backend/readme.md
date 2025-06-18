# TechLearn Backend 
## Overview

This is a basic backend setup for user authentication including **register** and **login** functionalities using **Node.js**, **Express**, and **MongoDB**.

---

## Features Implemented

- User registration with fields:
  - First Name
  - Last Name
  - Email
  - Password
  - Confirm Password

- Passwords are hashed securely using **bcrypt** before saving to the database.

- User login with email and password authentication.

- Password comparison during login uses bcrypt to validate credentials.

---

## Technologies Used

- Node.js (v21.7.2)
- Express.js
- MongoDB
- Mongoose (ODM)
- bcrypt (for password hashing)

---

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up MongoDB and update the connection string in `server.js`.
4. Start the server with `npx nodemon server.js` or `node server.js`.
5. Use API routes `/register` and `/login` to test user authentication.

---

## DAY-1 DELIVERABLES
- Implemented token-based authentication (e.g., JWT).
- Add validation and error handling improvements.
- Create frontend UI to connect with these APIs.