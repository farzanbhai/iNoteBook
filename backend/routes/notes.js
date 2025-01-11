// Importing required modules
const express = require("express");
const router = express.Router(); // Creating a router instance for handling routes
const fetchuser = require("../middleware/fetchuser"); // Middleware to fetch user data from the JWT token
const Note = require("../models/Note"); // Importing the Note model
const { body, validationResult } = require("express-validator"); // Validation functions from express-validator

/**
 * ROUTE 1: Fetch All Notes
 * Endpoint: GET "/api/notes/fetchallnotes"
 * Description: Fetches all notes for the logged-in user. Login required.
 */
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // Find all notes belonging to the logged-in user
    const notes = await Note.find({ user: req.user.id });
    res.json(notes); // Send the notes as the response
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); // Handle server errors
  }
});

/**
 * ROUTE 2: Add a New Note
 * Endpoint: POST "/api/notes/addnote"
 * Description: Adds a new note for the logged-in user. Login required.
 */
router.post(
  "/addnote",
  fetchuser, // Middleware to verify the user's identity
  [
    // Validation rules for the note's title and description
    body("title", "Enter a valid title").isLength({ min: 3 }), // Title must be at least 3 characters
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }), // Description must be at least 5 characters
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; // Extract note details from the request body

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
      }

      // Create a new note with the provided details and the logged-in user's ID
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // Save the note to the database
      const savedNote = await note.save();
      res.json(savedNote); // Send the saved note as the response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error"); // Handle server errors
    }
  }
);

/**
 * ROUTE 3: Update an Existing Note
 * Endpoint: PUT "/api/notes/updatenote/:id"
 * Description: Updates a note for the logged-in user. Login required.
 */
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body; // Extract updated details from the request body
  try {
    // Create an object containing the updated fields
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated by its ID
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found"); // If note not found, return a 404 error
    }

    // Ensure that the logged-in user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed"); // Return a 401 error if the user doesn't own the note
    }

    // Update the note in the database
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote }, // Update with the new details
      { new: true } // Return the updated note
    );
    res.json({ note }); // Send the updated note as the response
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); // Handle server errors
  }
});

/**
 * ROUTE 4: Delete an Existing Note
 * Endpoint: DELETE "/api/notes/deletenote/:id"
 * Description: Deletes a note for the logged-in user. Login required.
 */
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted by its ID
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found"); // If note not found, return a 404 error
    }

    // Ensure that the logged-in user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed"); // Return a 401 error if the user doesn't own the note
    }

    // Delete the note from the database
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note }); // Send a success message and the deleted note
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); // Handle server errors
  }
});

// Export the router for use in other parts of the application
module.exports = router;
