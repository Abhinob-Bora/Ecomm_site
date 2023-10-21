const jwt = require('jsonwebtoken');

// Define your secret key for signing and verifying JWT tokens
const secretKey = 'your-secret-key'; // Replace with your actual secret key

function verifyToken(req, res, next) {
  // Get the token from the request's headers, query, or body
  const token = req.headers['authorization'] || req.query.token || req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  // Verify and decode the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  });
}

module.exports = verifyToken;
