// Required Modules
const express = require('express');  // Express.js for routing
const router = express.Router();  // Router instance from Express
const { UserModel: User, validateUser } = require('../models/user');  // Importing User model and validation function
const bcrypt = require('bcrypt');  // For hashing passwords
const jwt = require('jsonwebtoken');  // For generating JWT tokens

/**
 * POST: Endpoint for User Signup
 * This endpoint is responsible for registering new users.
 * The incoming request should contain username, password, firstName, and lastName in JSON format.
 */
router.post('/signup', (req, res) => {
    // Validate user data against predefined Joi schema
    const { error } = validateUser(req.body);
    if (error) {
        // If validation fails, return a 400 Bad Request status code and validation error message
        return res.status(400).send(error.details[0].message);
    }
    
    // Hash the user's password using bcrypt
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Create a new User document using the hashed password and other provided details
            const user = new User({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash
            });
            
            // Persist the User document to the database
            return user.save();
        })
        .then(result => {
            // On successful registration, return a 201 Created status code and result
            res.status(201).json({
                message: 'User created',
                result: result
            });
        })
        .catch(err => {
            // Log error for debugging and return a 500 Internal Server Error status code
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        });
});

/**
 * POST: Endpoint for User Login
 * This endpoint is responsible for authenticating existing users.
 * The incoming request should contain username and password in JSON format.
 */
router.post('/login', (req, res) => {
    // Validate user data against predefined Joi schema
    const { error } = validateUser(req.body);
    if (error) {
        // If validation fails, return a 400 Bad Request status code and validation error message
        return res.status(400).send(error.details[0].message);
    }

    let fetchedUser;  // To store the fetched user document
    
    // Query the database to find the user by username
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                // If user is not found, reject the promise
                return Promise.reject(new Error("Authentication failed"));
            }
            fetchedUser = user;
            
            // Compare provided password with stored hashed password
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                // If passwords do not match, reject the promise
                return Promise.reject(new Error("Authentication failed"));
            }
            
            // Generate a JWT token for the authenticated user
            const token = jwt.sign(
                { username: fetchedUser.username, userId: fetchedUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            // Send the generated token to the client
            res.status(200).json({ token: token });
        })
        .catch(err => {
            // Log error for debugging and return a 500 Internal Server Error status code
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        });
});

// Export the router for mounting in the main application file
module.exports = router;
