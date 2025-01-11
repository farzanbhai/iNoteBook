import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext"; // Import the noteContext to access notes and note actions
import Noteitems from "./Noteitmes"; // Import Noteitems component to display individual notes
import AddNote from "./AddNote"; // Import AddNote component to add new notes
import { useNavigate } from "react-router"; // Import useNavigate hook to handle redirection

const Notes = (props) => {
  const context = useContext(noteContext); // Access the note context to use the functions provided
  let navigate = useNavigate(); // Initialize the navigate function to navigate between routes
  const { notes, getNotes, editNote } = context; // Destructure notes, getNotes, and editNote from context

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // Check if the token exists in localStorage
      getNotes(); // Fetch notes if the token is present
    } else {
      navigate("/login"); // Redirect to login if the token is not present
    }
    // eslint-disable-next-line
  }, []); // Empty dependency array to ensure the effect runs only once

  const ref = useRef(null); // Create a reference for the modal open button
  const refClose = useRef(null); // Create a reference for the modal close button
  const [note, setNote] = useState({
    id: "", // Set default empty values for the note
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    // Function to set the current note for editing
    ref.current.click(); // Open the modal when the updateNote function is called
    setNote({
      id: currentNote._id, // Set the note's ID
      etitle: currentNote.title, // Set the title of the note
      edescription: currentNote.description, // Set the description of the note
      etag: currentNote.tag, // Set the tag of the note
    });
  };

  const handleClick = (e) => {
    // Function to handle the update note action
    editNote(note.id, note.etitle, note.edescription, note.etag); // Call the editNote function to update the note
    refClose.current.click(); // Close the modal after the note is updated
    props.showAlert("Note Updated", "success"); // Show success alert after updating the note
  };

  const onChange = (e) => {
    // Function to handle input field changes
    setNote({ ...note, [e.target.name]: e.target.value }); // Update the respective field in the note state
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />{" "}
      {/* AddNote component for adding new notes */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal" // Trigger the modal when the button is clicked
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note {/* Modal header with title */}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>{" "}
              {/* Close button for the modal */}
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required // Ensure the title has a minimum length
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required // Ensure the description has a minimum length
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close {/* Close button for the modal */}
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                } // Disable button if title or description is too short
                onClick={handleClick} // Call handleClick to update the note
                type="button"
                className="btn btn-primary"
              >
                Update Note {/* Button to update the note */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {(!Array.isArray(notes) || notes.length === 0) &&
            "No notes to display"}{" "}
          {/* Show message if no notes are available */}
        </div>
        {Array.isArray(notes) && // Render notes only if the notes array is valid
          notes.map((note) => {
            return (
              <Noteitems
                key={note._id}
                updateNote={updateNote}
                note={note}
                showAlert={props.showAlert}
              /> // Render each note using Noteitems component
            );
          })}
      </div>
    </>
  );
};

export default Notes;
