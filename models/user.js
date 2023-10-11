// Import the mongoose library for data modeling
const mongoose = require('mongoose');
const Joi = require('joi');

// Define the User schema
// This schema will define the structure of documents within the MongoDB collection
const userschema = mongoose.Schema({
    username: { type: String, required: true, unique: true }, // The unique username for each user
    firstName: String,
    lastName: String,
    password: { type: String, required: true }  // The hashed password for user authentication
});

// Export the User model
// This creates a Mongoose model named 'User' that uses the schema defined above
const UserModel = mongoose.model('User', userschema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        firstName: Joi.string().min(1).max(50).optional(),
        lastName: Joi.string().min(1).max(50).optional(),
        password: Joi.string().min(8).max(50).required()
    });

    return schema.validate(user);
}

// Export both the User model and the validateUser function
module.exports = {
    UserModel,
    validateUser
};