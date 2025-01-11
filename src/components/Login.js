import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = (props) => {
  // State to store the email and password entered by the user
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // To navigate to different routes after successful login

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior (refreshing the page)

    // Sending a POST request to the backend with email and password
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    // Parsing the JSON response from the backend
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // If login is successful, store the auth token in local storage
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Successfully Logged in", "success"); // Show success alert
      navigate("/"); // Redirect the user to the home page ("/")
    } else {
      props.showAlert("Invalid Details", "danger"); // Show error alert if login fails
    }
  };

  // Function to update state as the user types in the input fields
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <h2>Welcome To iNoteBook - Login to Continue</h2>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            style={{ border: "1px solid black" }}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            style={{ border: "1px solid black" }}
            name="password"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
