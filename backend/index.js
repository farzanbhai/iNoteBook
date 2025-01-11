// Importing the MongoDB connection function
const connectToMongo = require('./db');

// Importing required libraries
const express = require('express');
var cors = require('cors'); // CORS (Cross-Origin Resource Sharing) module for handling cross-origin requests

// Establish MongoDB connection
connectToMongo();

// Initialize Express app
const app = express();

// Define the port number for the server
const port = 5000;

// Enable CORS for handling requests from different domains
app.use(cors());

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Define the available routes for authentication and notes management
app.use('/api/auth', require('./routes/auth'));  // Authentication-related routes (signup, login, etc.)
app.use('/api/notes', require('./routes/notes'));  // Routes for note management (CRUD operations)

// Start the Express server and listen on the defined port
app.listen(port, () => {
  // Log the message when the server is up and running
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
