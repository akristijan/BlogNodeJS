
const express = require('express');
const router = express.Router();


//Main routes - simplified for now
router.get('/', (req, res) => {
    const locals = {
        title:"Zmaj Node",
        description: "Bice iz gospodara prstenova"
        
    }
    res.render("index", locals)
})

router.get('/about', (req, res) => {
    res.render('about')
})


module.exports = router;
