
const express = require('express');
const router = express.Router();


//Main routes - simplified for now
router.get('/', (req, res) => {
    res.send("Hello ratnice")
})


module.exports = router;
