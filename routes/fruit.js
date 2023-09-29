// Required Modules
const express = require('express');
const router = express.Router();
const Fruit = require('../models/fruit');
const checkAuth = require('../check-auth');

// GET: Retrieve all fruits (Requires Authentication)
// This route is protected by the "checkAuth" middleware function
router.get('', checkAuth, (req, res) => {
    // Using Mongoose's find method to get all fruits from the database
    Fruit.find()
        .then((fruits) => {
            // Sending a successful response along with the list of fruits
            res.json({
                message: 'Fruits found',
                fruits: fruits
            });
        })
        .catch((err) => {
            // Handling any errors that occur
            res.status(500).json({ error: err });
        });
});

// POST: Create a new fruit (Requires Authentication)
// This route is protected by the "checkAuth" middleware function
router.post('', checkAuth, (req, res) => {
    // Creating a new Fruit document using the request's body data
    const fruit = new Fruit({
        id: req.body.id,
        name: req.body.name,
        userId: req.userData.userId  
    });
    
    // Saving the newly created fruit to the database
    fruit.save();
    
    // Sending a successful response along with the created fruit object
    res.status(201).json({
        message: 'Fruit created',
        fruit: fruit
    });
});

// DELETE: Delete a fruit by its ID (Requires Authentication)
// This route is protected by the "checkAuth" middleware function
router.delete('', checkAuth, (req, res) => {
    // Extracting the ID of the fruit to delete from the request's body
    const idToDelete = req.body.id;
    
    // Using Mongoose's deleteOne method to delete the specified fruit
    Fruit.deleteOne({ _id: idToDelete, userId: req.userData.userId })
        .then((result) => {
            // Checking if any documents were actually deleted
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Fruit not found" });
            }
            
            // Sending a successful response
            res.status(200).json({ message: "Fruit Deleted" });
        })
        .catch((err) => {
            // Handling any errors that occur
            res.status(500).json({ error: err });
        });
});

// Exporting the router for use in other parts of the application
module.exports = router;
