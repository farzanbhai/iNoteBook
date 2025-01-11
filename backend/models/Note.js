// Importing the mongoose library to work with MongoDB
const mongoose = require("mongoose");

// Extracting the Schema constructor from mongoose
const { Schema } = mongoose;

// Defining the schema for the "Notes" collection in the database
const NotesSchema = new Schema({
  // Field to associate the note with a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId, // References the ObjectId of a document in the "user" collection
    ref: "user", // Establishes a relationship with the "user" model
  },
  // Field for the note's title
  title: {
    type: String, // Specifies the type of data as a string
    required: true, // Makes this field mandatory
  },
  // Field for the note's description or content
  description: {
    type: String, // Specifies the type of data as a string
    required: true, // Makes this field mandatory
  },
  // Optional field for categorizing the note with a tag
  tag: {
    type: String, // Specifies the type of data as a string
    default: "General", // Sets a default value if no tag is provided
  },
  // Field to store the creation or modification date of the note
  date: {
    type: Date, // Specifies the type of data as a date
    default: Date.now, // Automatically sets the current date and time
  },
});

// Exporting the Notes model to use it in other parts of the application
// The collection in MongoDB will be named "notes" (pluralized form of the model name)
module.exports = mongoose.model("notes", NotesSchema);
