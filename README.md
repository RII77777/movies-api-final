# Movie Database API - Final Project
https://movies-api-69x7.onrender.com/
https://github.com/RII77777/movies-api-final
## Project Overview
A full-stack movie database application with user authentication, role-based access control, and comprehensive CRUD operations for movies and reviews. Built with Node.js, Express, MongoDB, and a responsive frontend interface.

## Live Deployment

Live Application: https://movies-api-69x7.onrender.com/

GitHub Repository: https://github.com/RII77777/movies-api-final

API Base URL:  https://movies-api-69x7.onrender.com/api

## Features

User Authentication - Secure registration/login with JWT tokens

Role-Based Access Control - Admin/User permissions system

Movie Management - Full CRUD operations for movies

Review System - Users can post and manage reviews

Responsive Frontend - Modern, mobile-friendly interface

MVC Architecture - Clean separation of concerns

Error Handling - Comprehensive error management

Data Validation - Server-side validation for all inputs

## Technology Stack

 **Backend**: Node.js, Express.js
 **Database**: MongoDB with Mongoose ODM
 **Authentication**: JWT (JSON Web Tokens), bcrypt
 **Frontend**: HTML5, CSS3, Vanilla JavaScript
 **Middleware**: CORS, express-validator, custom auth middleware
 **Deployment**: Render (Backend), MongoDB Atlas (Database)

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

1. Full-Stack Integration

Backend and frontend successfully integrated

Working CRUD operations for all entities

Authentication flow fully implemented

Real-time data synchronization between client and server

2. Deployment

Backend: Deployed on Render (Node.js/Express)

Frontend: Served from Express static files on Render

Database: MongoDB Atlas cloud database

Environment Variables: Securely managed via Render dashboard

Public URL: Accessible worldwide

3. Code Quality

MVC Structure: Controllers, Models, Routes properly separated

Middleware: Authentication, validation, error handling middleware

Error Handling: Comprehensive error responses and logging

Security: Password hashing, JWT tokens, input validation

Code Organization: Modular, well-commented code


API Documentation

Authentication Endpoints

Method	Endpoint	Description	Access

POST	/api/auth/register	Register new user	Public

POST	/api/auth/login	Login user	Public

Movie Endpoints

Method	Endpoint	Description	Access

GET	/api/movies	Get all movies	Public

GET	/api/movies/:id	Get single movie	Public

POST	/api/movies	Create new movie	Admin only

PUT	/api/movies/:id	Update movie	Admin only

DELETE	/api/movies/:id	Delete movie	Admin only

Review Endpoints

Method	Endpoint	Description	Access

GET	/api/reviews	Get all reviews	Public

POST	/api/reviews	Create review	Authenticated

PUT	/api/reviews/:id	Update review	Owner/Admin

DELETE	/api/reviews/:id	Delete review	Owner/Admin

## Project Structure

project/

- controllers/

authController.js

movieController.js

reviewController.js

- models/     # MongoDB schemas

User.js

 Movie.js

 Review.js

-  middleware/    #Custom middleware

│ authMiddleware.js

│ roleMiddleware.js

│ ownerMiddleware.js

│ validationMiddleware.js

- routes/        # API routes

│authRoutes.js

│ movieRoutes.js

│ reviewRoutes.js

- public/       # Frontend files

│ css/

│ js/

│ index.html

- .env            # Environment variables

- package.json        # Dependencies

- server.js # Application entry point

## Local Development Setup

Prerequisites

Node.js (v18 or higher)

MongoDB Atlas account

Git

Installation Steps

Clone the repository:

git clone https://github.com/RII77777/movies-api-final
cd assignment-3-movies

Install dependencies:

npm install

Configure environment variables

Create a .env file in the root directory:

env

MONGODB_URI=mongodb+srv://myusername:mypassword@cluster0.ubklov4.mongodb.net/?appName=Cluster0/moviesDB

JWT_SECRET=key

PORT=3000

NODE_ENV=production

Start the development server:

npm start

Access the application

Frontend: http://localhost:3000

API: http://localhost:3000/api

## Deployment Process

1. Render Deployment Steps

Created Render account and connected GitHub repository

Selected "Web Service" with Node.js runtime

Configured build command: npm install

Configured start command: npm start

Added environment variables in Render dashboard:

MONGODB_URI

JWT_SECRET

Selected Free instance type

Enabled auto-deploy from main branch

2. MongoDB Atlas Configuration

Created free cluster on MongoDB Atlas

Configured network access (0.0.0.0/0 for all IPs)

Created database user with read/write permissions

Obtained connection string for environment variables

## Testing

Postman Collection

A complete Postman collection is available for testing all API endpoints. Import MovieAPI.postman_collection.json to test:

Authentication Flow

User registration

User login

Token verification

Movie Operations

Create movie (admin)

Read movies (public)

Update movie (admin)

Delete movie (admin)

Review Operations

Create review (authenticated)

Read reviews (public)

Update/delete review (owner/admin)

Manual Testing

Open the live application

Register a new account

Login with credentials

Browse movies (public)

Create reviews (authenticated users)

Admin features require admin role

## Support & Issues

Password hashing with bcryptjs

JWT token-based authentication

Role-based access control

Input validation and sanitization

Environment variable protection

CORS configuration

HTTPS enforcement on production

## Support & Issues
For issues or questions:

Check the application logs on Render dashboard

Review API responses in browser developer tools

Test endpoints with Postman collection

Refer to GitHub repository for latest code

## License
This project is developed for educational purposes as part of the assignment requirements.