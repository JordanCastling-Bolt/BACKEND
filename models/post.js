// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the Post model
// The schema outlines the shape of the documents within MongoDB collection
const postschema = mongoose.Schema(
    {
        id: { type: String, required: true },  // Unique identifier for each post
        title: {type: String, required: true }, //Post Title
        post: { type: String, required: true } // Post content
    }
);

// Export the Post model based on the schema
// This will create a Mongoose model named 'Post' and it will use the schema defined above
module.exports = mongoose.model('Posts', postschema);
