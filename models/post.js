// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the Fruit model
// The schema outlines the shape of the documents within MongoDB collection
const postschema = mongoose.Schema(
    {
        id: { type: String, required: true },  // Unique identifier for each fruit
        title: {type: String, required: true },
        post: { type: String, required: true } // Name of the fruit
    }
);

// Export the Fruit model based on the schema
// This will create a Mongoose model named 'Fruit' and it will use the schema defined above
module.exports = mongoose.model('Posts', postschema);
