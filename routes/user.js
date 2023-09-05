const express = require('express')
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });

                });
        });
})
router.post('/login', (req, res) => {
    console.log("Attempting to login user: ", req.body.username);
    
    let fetchedUser;
    
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(401).json({ message: "Authentication failed1" });
            }
            console.log("User found, comparing passwords");
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                console.log("Password mismatch");
                return res.status(401).json({ message: "Authentication failed2" });
            }
            console.log("Password match, generating token");
            const token = jwt.sign(
                { username: fetchedUser.username, userId: fetchedUser._id },
                'secret_this_should_be_longer_than_it_is',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token });
        })
        .catch(err => {
            console.error("An error occurred:", err);
            return res.status(401).json({ message: "Authentication failed3" });
        });
});

module.exports = router;
