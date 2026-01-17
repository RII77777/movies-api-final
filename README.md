Movies and Reviews API

A simple CRUD API for managing movies and reviews. Built with Node.js, Express, and MongoDB.

Features

Create, read, update, delete movies

Create, read, update, delete reviews for movies

MongoDB database storage

Simple web interface

Setup Instructions

Install dependencies
npm install

Set up MongoDB

Option A: Local MongoDB

Install MongoDB on your computer

Run MongoDB locally

No changes needed to server.js

Option B: MongoDB Atlas

Create account at mongodb.com

Create a free cluster

Get connection string

Update server.js with your connection string

Run the application

Development mode:
npm run dev

Production mode:
npm start

Open in browser
Go to: http://localhost:3000

API Endpoints

Movies

POST /movies - Create new movie

GET /movies - Get all movies

GET /movies/:id - Get single movie

PUT /movies/:id - Update movie

DELETE /movies/:id - Delete movie

Reviews

POST /reviews - Create new review

GET /reviews - Get all reviews with movie details

GET /reviews/movie/:movieId - Get reviews for specific movie

PUT /reviews/:id - Update review

DELETE /reviews/:id - Delete review

Project Structure

project/
models/
│Movie.js
│Review.js
routes/
│movieRoutes.js
│reviewRoutes.js
public/
│index.html
server.js
package.json

Testing with Postman

Import the Postman collection

Test all endpoints:

Create movie (POST /movies)

Get all movies (GET /movies)

Create review (POST /reviews)

Get all reviews (GET /reviews)

Update and delete operations

Screenshots

See the screenshots/ folder for:

Postman API testing

Web interface

MongoDB Atlas data

Terminal output

Technologies Used

Node.js

Express.js

MongoDB (with Mongoose)

HTML/JavaScript (frontend)

Notes

All movie fields are validated (title, director, year required)

Reviews require movieId, author, text, and rating

Timestamps are automatically added

CORS is enabled for frontend access