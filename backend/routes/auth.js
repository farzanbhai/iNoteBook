// Importing required modules
const express = require("express");
const router = express.Router(); // Creating a router instance for handling routes
const User = require("../models/User"); // Importing the User model
const { body, validationResult } = require("express-validator"); // Importing validation functions
const bcrypt = require("bcryptjs"); // Importing bcrypt for hashing passwords
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation
const fetchuser = require("../middleware/fetchuser"); // Middleware to fetch user data from the JWT token

// Secret key for JWT signing (should be stored securely, e.g., in environment variables)
const JWT_SECRET = "Farzanisagoodboy";

/**
 * ROUTE 1: Create a User
 * Endpoint: POST "/api/auth/createuser"
 * Description: Registers a new user in the system. No login required.
 */
router.post(
  "/createuser",
  [
    // Validation rules for incoming data
    body("name", "Enter a valid name").isLength({ min: 3 }), // Name should be at least 3 characters
    body("email", "Enter a valid email").isEmail(), // Email should be valid
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }), // Password should be at least 5 characters
  ],
  async (req, res) => {
    let success = false;

    // Validate the request and check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() }); // Return validation errors
    }

    try {
      // Check if a user with the same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry, a user with this email already exists",
          });
      }

      // Hash the user's password using bcrypt
      const salt = await bcrypt.genSalt(10); // Generate a salt
      const secPass = await bcrypt.hash(req.body.password, salt); // Hash the password

      // Create a new user in the database
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // Generate a JWT token for the newly created user
      const data = {
        user: {
          id: user.id, // Store the user's ID in the token payload
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true; // Indicate successful user creation
      res.json({ success, authtoken }); // Send the token in the response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error"); // Send a server error response if something goes wrong
    }
  }
);

/**
 * ROUTE 2: Authenticate a User
 * Endpoint: POST "/api/auth/login"
 * Description: Logs in an existing user and returns a JWT token. No login required.
 */
router.post(
  "/login",
  [
    // Validation rules for incoming data
    body("email", "Enter a valid email").isEmail(), // Email should be valid
    body("password", "Password cannot be blank").exists(), // Password must be provided
  ],
  async (req, res) => {
    let success = false;

    // Validate the request and check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { email, password } = req.body; // Extract email and password from the request body
    try {
      // Check if the user exists with the provided email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      // Generate a JWT token for the authenticated user
      const data = {
        user: {
          id: user.id, // Store the user's ID in the token payload
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true; // Indicate successful login
      res.json({ success, authtoken }); // Send the token in the response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error"); // Send a server error response if something goes wrong
    }
  }
);

/**
 * ROUTE 3: Get Logged-in User Details
 * Endpoint: POST "/api/auth/getuser"
 * Description: Returns details of the logged-in user. Login required.
 */
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // Fetch the user ID from the request (set by the fetchuser middleware)
    const userId = req.user.id;

    // Retrieve the user details from the database, excluding the password field
    const user = await User.findById(userId).select("-password");
    res.send(user); // Send the user details in the response
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); // Send a server error response if something goes wrong
  }
});

// Export the router for use in other parts of the application
module.exports = router;
