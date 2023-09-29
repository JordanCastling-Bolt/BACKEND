// Import JWT package for token verification
const jwt = require('jsonwebtoken');
//require('dotenv').config();

// Middleware function for authentication
module.exports = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    // Attach decoded payload to request object
    req.userData = decoded;
    
    // Continue to the next middleware
    next();
  } catch (error) {
    // Catch any errors and respond with a 401 Unauthorized status
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
