# Node.js and Express Backend Service

This backend service is built using Node.js and Express. It provides a RESTful API for managing users and posts, as well as a JWT-based authentication mechanism.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [HTTPS Configuration](#https-configuration)
- [Error Handling](#error-handling)

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/JordanCastling-Bolt/BACKEND.git
    ```

2. Navigate to the project directory
    ```bash
    cd BACKEND
    ```

3. Install the dependencies
    ```bash
    npm install
    ```

4. Run the application
    ```bash
    npm run dev
    ```

## Environment Variables

To securely manage secrets, create a `.env` file at the root of your project and populate it as follows:

```dotenv
JWT_SECRET=SPARKY@2204//17096823@Jd
MONGODB_CONN_STRING=mongodb+srv://jdcastlingbolt:JHiwDc31ZV2JHQoS@cluster0.aavwrft.mongodb.net/?retryWrites=true&w=majority
```

To load the environment variables, add the following code to the top of your main application file (`app.js` and `check-auth.js`):

```javascript
require('dotenv').config();
```

## Endpoints

- `/api/posts`: Manage posts
- `/api/users`: Manage users
- `/api`: Sanity checks

## Authentication

The API uses JWT-based authentication. Tokens are generated upon successful login and are required to access protected routes. To add authentication to a specific route, include the `check-auth` middleware as demonstrated in the codebase.

## HTTPS Configuration

The service uses HTTPS for added security. Place your SSL certificate (`certificate.pem`) and private key (`privatekey.pem`) files in the `keys/` directory.

## Error Handling

Custom error handling middleware is used to catch and respond to errors throughout the application. This ensures that the application fails gracefully and provides informative error messages.

---
