const express = require('express');
const router = express.Router();
//Sanity check
router.get('/', (req, res) => {
  res.send('API is working');
});

module.exports = router;
