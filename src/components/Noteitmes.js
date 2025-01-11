import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext); // Access the note context to use the functions provided
  const { deleteNote } = context; // Destructure the deleteNote function from context
  const { note, updateNote } = props; // Destructure the note and updateNote props passed from the parent component

  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ border: "1px solid black" }}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
          </div>
          <p className="card-text">{note.description}</p>

          {/* Delete Note Icon */}
          <i
            className="far fa-trash-alt mx-3"
            onClick={() => {
              deleteNote(note._id); // Call the deleteNote function with the note's ID
              props.showAlert("Note Deleted", "success"); // Show success alert after deleting
            }}
          ></i>

          {/* Edit Note Icon */}
          <i
            className="far fa-edit mx-3"
            onClick={() => {
              updateNote(note); // Call the updateNote function passed down via props with the note as an argument
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
