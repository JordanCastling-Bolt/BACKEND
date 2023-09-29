// Import the mongoose library for data modeling
const mongoose = require('mongoose');

// Define the User schema
// This schema will define the structure of documents within the MongoDB collection
const userschema = mongoose.Schema({
    username: { type: String, required: true }, // The unique username for each user
    password: { type: String, required: true }  // The hashed password for user authentication
});

// Export the User model
// This creates a Mongoose model named 'User' that uses the schema defined above
module.exports = mongoose.model('User', userschema);
