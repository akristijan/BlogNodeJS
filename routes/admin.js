
const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin")

//Get Admin - Login Page
router.get("/", adminController.getAdmin);
router.post("/", adminController.checkLogin);
router.get('/dashboard', adminController.getDashboard);
//Sign up a new user
router.post('/register', adminController.registerUser)

module.exports = router;