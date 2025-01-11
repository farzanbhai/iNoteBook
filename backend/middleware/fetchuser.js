// Importing the jsonwebtoken library to handle JWT operations
const jwt = require("jsonwebtoken");

// A secret key used to sign and verify JWT tokens.
// This should ideally be stored securely (e.g., in an environment variable).
const JWT_SECRET = "Farzanisagoodboy";

/**
 * Middleware function to authenticate the user using a JWT token.
 *
 * This function extracts the token from the `auth-token` header,
 * verifies it using the secret key, and adds the user's data to the `req` object.
 * If authentication fails, it sends an appropriate error response.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - Callback function to pass control to the next middleware.
 */
const fetchuser = (req, res, next) => {
  // Retrieve the token from the request header named 'auth-token'
  const token = req.header("auth-token");

  // If the token is not provided, respond with a 401 Unauthorized status
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token using the secret key and decode the payload
    const data = jwt.verify(token, JWT_SECRET);

    // Attach the user's data (decoded from the token) to the `req.user` object
    req.user = data.user;

    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // If the token is invalid or verification fails, respond with a 401 status
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

// Export the fetchuser middleware for use in other parts of the application
module.exports = fetchuser;
