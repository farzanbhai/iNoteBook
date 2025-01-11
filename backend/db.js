// Importing the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/";

/**
 * Function to connect to the MongoDB database
 * This function uses Mongoose's `connect` method to establish a connection
 */
const connectToMongo = async () => {
    try {
        // Attempt to connect to the database using the connection string
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true, // Ensures MongoDB connection is established using the new URL parser
            useUnifiedTopology: true, // Enables the new server discovery and monitoring engine
        });
        console.log("Connected to MongoDB successfully"); // Log success message if connection is successful
    } catch (error) {
        // Log the error message if the connection fails
        console.error("Error connecting to MongoDB:", error);
    }
};

// Exporting the `connectToMongo` function for use in other parts of the application
module.exports = connectToMongo;
