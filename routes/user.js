// Required Modules
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST: Endpoint for User Signup
// This route allows a new user to create an account.
router.post('/signup', (req, res) => {
    // Hash the password using bcrypt with 10 rounds of salting
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Create a new User document using the hashed password and provided username
            const user = new User({
                username: req.body.username,
                password: hash
            });
            // Save the new user to the database
            return user.save();
        })
        .then(result => {
            // Send a successful response with status 201 (Created)
            res.status(201).json({
                message: 'User created',
                result: result
            });
        })
        .catch(err => {
            // Handle any errors that occur and send a 500 (Internal Server Error) status
            res.status(500).json({
                error: err
            });
        });
});

// POST: Endpoint for User Login
// This route allows existing users to log in to their accounts.
router.post('/login', (req, res) => {
    let fetchedUser;
    // Find the user in the database by username
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                // If the username is not found, send a 401 (Unauthorized) status
                return res.status(401).json({ message: "Authentication failed" });
            }
            fetchedUser = user;
            // Compare the provided password with the stored hashed password
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                // If the password does not match, send a 401 (Unauthorized) status
                return res.status(401).json({ message: "Authentication failed" });
            }
            // Generate a JWT token
            const token = jwt.sign(
                { username: fetchedUser.username, userId: fetchedUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            // Send the token back to the client
            res.status(200).json({ token: token });
        })
        .catch(err => {
            // Handle any errors that occur and send a 500 (Internal Server Error) status
            res.status(500).json({ message: "Internal Server Error" });
        });
});

// Exporting the router for use in other parts of the application
module.exports = router;
