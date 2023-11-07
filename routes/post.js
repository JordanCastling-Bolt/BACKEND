// Required Modules
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkAuth = require('../check-auth'); 

// GET: Retrieve all posts (Requires Authentication)
// This route is protected by the "checkAuth" middleware function
router.get('/', checkAuth, (req, res) => {
    // Using Mongoose's find method to get all posts from the database
    Post.find()
        .select('id title post department') // Selecting the fields to return
        .then(posts => {
            // Sending a successful response along with the list of posts
            res.json({
                message: 'Posts found',
                posts: posts
            });
        })
        .catch(err => {
            // Handling any errors that occur
            res.status(500).json({ error: err });
        });
});

// POST: Create a new post (Requires Authentication)
// This route is protected by the "checkAuth" middleware function
router.post('/', checkAuth, (req, res) => {
    // Creating a new Post document using the request's body data
    const post = new Post({
        id: req.body.id,
        title: req.body.title,
        post: req.body.post,
        department: req.body.department
    });

    // Saving the newly created post to the database
    post.save()
        .then(createdPost => {
            // Sending a successful response along with the created post object
            res.status(201).json({
                message: 'Post created',
                post: createdPost
            });
        })
        .catch(err => {
            // Handling any errors that occur
            res.status(500).json({ error: err });
        });
});

// DELETE: Delete a post by its ID (Requires Authentication)
// This route is protected by the "checkAuth" middleware function
router.delete('/:id', checkAuth, (req, res) => {
    // Using Mongoose's deleteOne method to delete the specified post by its ID
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            // Checking if any documents were actually deleted
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Post not found" });
            }

            // Sending a successful response
            res.status(200).json({ message: "Post deleted" });
        })
        .catch(err => {
            // Handling any errors that occur
            res.status(500).json({ error: err });
        });
});

// Exporting the router for use in other parts of the application
module.exports = router;
