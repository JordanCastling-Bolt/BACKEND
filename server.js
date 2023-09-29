// Import required modules
const http = require('https');
const app = require('./app');
const fs = require('fs');

// Define the port to listen on
const port = 3000;

// Read SSL certificate and private key files
const privateKey = fs.readFileSync('keys/privatekey.pem');
const certificate = fs.readFileSync('keys/certificate.pem');

// Create an HTTPS server with SSL options
const server = http.createServer(
    {
        key: privateKey,  // Private key for SSL
        cert: certificate // SSL certificate
    },
    app  // Express application
);

// Start the server, listening on the defined port
server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}/`);
});
