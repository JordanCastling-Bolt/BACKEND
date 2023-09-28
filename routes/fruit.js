const express = require('express')
const router = express.Router();
const Fruit = require('../models/fruit')
const checkAuth = require('../check-auth') 

router.get('', (req, res) => {
    Fruit.find().then((fruits) => {
        res.json(
            {
                message: 'Fruits found',
                fruits: fruits
            }
        )
    })
})

router.post('', checkAuth, (req, res) => {
    const fruit = new Fruit(
        {
            id: req.body.id,
            name: req.body.name,
            userId: req.userData.userId  
        }
    )
    fruit.save();
    res.status(201).json({
        message: 'Fruit created',
        fruit: fruit
    })
})

router.delete('', checkAuth, (req, res) => {
    const idToDelete = req.body.id;  

    
    Fruit.deleteOne({ _id: idToDelete, userId: req.userData.userId })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Fruit not found" });
            }
            res.status(200).json({ message: "Fruit Deleted" });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;
