// Importing required React modules and context
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext"; // Importing note context to use the addNote function

// AddNote component for adding a new note
const AddNote = (props) => {
  // Accessing the noteContext to interact with the context methods
  const context = useContext(noteContext);
  const { addNote } = context; // Destructuring the addNote function from the context

  // Setting initial state for the note (title, description, tag)
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // Function to handle form submission
  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Call addNote function from context with the current note data
    addNote(note.title, note.description, note.tag);

    // Reset the note state after adding the note
    setNote({ title: "", description: "", tag: "" });

    // Show a success alert after adding the note
    props.showAlert("Added Note Successfully", "success");
  };

  // Function to handle input changes in the form fields
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // Update the state based on input field name
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        {/* Title input field */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        {/* Description input field */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        {/* Tag input field */}
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        {/* Submit button */}
        <button
          disabled={note.title.length < 5 || note.description.length < 5} // Disable if title or description is too short
          type="submit"
          className="btn btn-primary"
          onClick={handleClick} // Call handleClick on button click
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
