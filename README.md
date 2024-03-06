# Recruitment app

## Project Description

This web application provides a service for people to sign up and apply for a job at an amusement park. A person can sign in with their credentials and make an application.

## Architecture
The application is structured into two main components: the backend and the frontend, both of which are written in JavaScript.
### Frontend
For the frontend we are using MVP for clarity and maintainability and cohesion

### Backend
The backend of our application adopts a combination of MVC (Model-View-Controller) and Integration layered architectures. This design ensures high cohesion and encapsulation while maintaining low coupling, which results in a modular and maintainable codebase.

* API Layer (View): This layer acts as the entry point for all frontend calls. It's responsible for receiving requests from the frontend
* Controller Layer: Serving as the intermediary, the Controller is responsible for all communication between the layers.
* Model Layer: Here, all Sequelize models and Data Transfer Objects (DTOs) reside.
* Integration Layer: Dedicated to database interactions, this layer handles all communications with the database.

## Prerequisites
Before you begin, ensure you have installed:

Node.js
npm (Node Package Manager)

## Installation
Node.js and npm

Download and install Node.js from the [official website](https://nodejs.org/en).
npm is included with Node.js. After installing, you can verify the installation by running node -v and npm -v in your terminal.

## Setting Up the Project
To set up the project on your local machine:

Clone the repository: git clone https://github.com/sebgro98/AwesomeProject
Navigate to the project directory: cd AwesomeProject

### Frontend Setup
cd frontend
Install dependencies: npm install

### Backend Setup
cd backend
Install dependencies: npm install

## Tools and Frameworks

### Frontend
##### React: A JavaScript library for building user interfaces.
##### Axios: For making HTTP requests.
##### React Create Root: For routing in React applications.
##### Sequelize: An ORM for Node.js, used to interact with PostgreSQL.
##### Testing Libraries: Includes Jest Dom, React Testing Library for testing React components.

### Backend
##### Express: A fast, unopinionated, minimalist web framework for Node.js.
##### Sequelize: ORM for Node.js, used for PostgreSQL database interactions.
##### JSON Web Tokens (JWT): For implementing authentication.
##### Cors: For enabling CORS (Cross-Origin Resource Sharing).
##### Dotenv: For loading environment variables from a .env file into process.env.

## Running the Project

### Running the Frontend
Inside the frontend directory: npm start
Access the frontend at http://localhost:3000.

### Running the Backend
1. make a copty of the file .env.example and create your own .env file.
2. Start your database.
3. Inside the backend directory: npm start

### Deployment
https://awesome-project-1fe60cd319b6.herokuapp.com/

### Contributors
* Sebastian Rone
* Sushil KC
* Ingemar Cederholm
* Liam Battini
