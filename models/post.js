const mongoose = require('mongoose');

// Enum for the government department names
const departmentEnum = [
  'Department of Education',
  'Department of Health',
  'Department of Transport',
  'Department of Finance',
  'Department of Justice',
  'Department of Defence',
  'Department of Labor',
  'Department of Energy',
  'Department of National Security',
  'Department of State',
];

// Define the schema for the Post model
const postSchema = mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier for each post
  title: { type: String, required: true }, // Post Title
  post: { type: String, required: true }, // Post content
  // Define the department field with the enum, specific to government departments
  department: { 
    type: String, 
    required: true, 
    enum: departmentEnum // This restricts the department to one of the predefined government departments
  }
});

// Export the Post model based on the schema
module.exports = mongoose.model('Posts', postSchema);
