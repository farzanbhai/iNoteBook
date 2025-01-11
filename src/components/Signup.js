import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle navigation after signup

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "", // Store the full name of the user
    email: "", // Store the email address of the user
    password: "", // Store the password for the user
    cpassword: "", // Store the confirmation password (for verification)
  });

  let navigate = useNavigate(); // Initialize navigate to redirect after successful signup

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const { name, email, password } = credentials; // Destructure credentials to get name, email, and password

    // Send a POST request to the server with user credentials to create a new user
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({
        name, // Send the name
        email, // Send the email
        password, // Send the password
      }),
    });

    const json = await response.json(); // Parse the response JSON from the server
    console.log(json); // Log the response to the console for debugging

    if (json.success) {
      // If signup is successful
      localStorage.setItem("token", json.authtoken); // Store the authentication token in localStorage
      navigate("/"); // Redirect to the homepage after successful signup
      props.showAlert("Successfully Signed Up", "success"); // Show a success alert
    } else {
      props.showAlert("Invalid Credentials", "danger"); // Show an error alert if signup fails
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); // Update the credentials state when input values change
  };

  return (
    <div className="container mt-3">
      <h2>Welcome To iNoteBook - SignUp to Continue</h2>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Form to handle signup */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            style={{ border: "1px solid black" }} // Custom style for the input
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            style={{ border: "1px solid black" }} // Custom style for the input
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="Password"
            onChange={onChange}
            style={{ border: "1px solid black" }} // Custom style for the input
            minLength={5} // Password must be at least 5 characters long
            required // Password field is required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            style={{ border: "1px solid black" }} // Custom style for the input
            minLength={5} // Confirmation password must be at least 5 characters long
            required // Confirmation password field is required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          {/* Submit button for the form */}
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
