// Importing the mongoose library to work with MongoDB
const mongoose = require("mongoose");

// Extracting the Schema constructor from mongoose
const { Schema } = mongoose;

// Defining the schema for the "User" collection in the database
const UserSchema = new Schema({
  // Field for the user's name
  name: {
    type: String, // Specifies the type of data as a string
    require: true, // Makes this field mandatory
  },
  // Field for the user's email address
  email: {
    type: String, // Specifies the type of data as a string
    require: true, // Makes this field mandatory
    unique: true, // Ensures that no two users can have the same email address
  },
  // Field for the user's hashed password
  password: {
    type: String, // Specifies the type of data as a string
    require: true, // Makes this field mandatory
  },
  // Field to store the date of user creation or modification
  date: {
    type: Date, // Specifies the type of data as a date
    default: Date.now, // Automatically sets the current date and time
  },
});

// Creating a Mongoose model for the "user" schema
// This allows us to interact with the "user" collection in the database
const User = mongoose.model("user", UserSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
