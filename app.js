// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

// Define constants
const app = express();
const urlprefix = '/api';
const helmet = require('helmet');
const morgan = require('morgan');

// Read SSL certificate
const cert = fs.readFileSync('keys/certificate.pem');

// MongoDB connection options
const options = {
    server: { sslCA: cert }
};

// MongoDB connection string
const connstring = process.env.MONGODB_CONN_STRING;

// Import route handlers
const postRoutes = require("./routes/post");
const userRoutes = require('./routes/user');
const sanityRoutes = require("./routes/sanity");

// Establish MongoDB connection
mongoose.connect(connstring)
    .then(() => {
        console.log('Connected :-)');  // Log success
    })
    .catch(() => {
        console.log('NOT Connected :-(');  // Log failure
    }, options);

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.use(helmet());
app.use(morgan('combined'));  // or choose another format

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Attach routes to URL paths
app.use(urlprefix + '/posts', postRoutes);
app.use(urlprefix + '/users', userRoutes);
app.use(urlprefix, sanityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error stack
    res.status(500).send('Something broke!');  // Send error response
});

// Export the app module
module.exports = app;
