
const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin")
const ensureAuth = require("../controllers/auth")

//Get Admin - Login Page
router.get("/", adminController.getAdmin);
router.post("/", adminController.checkLogin);
router.get('/dashboard', ensureAuth, adminController.getDashboard);
//admin -  new post
router.get('/add-post', ensureAuth, adminController.addPost);
router.post('/add-post', ensureAuth, adminController.createPost);
//Sign up a new user
router.post('/register', adminController.registerUser)

module.exports = router;