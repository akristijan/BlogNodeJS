
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
router.post('/register', adminController.registerUser);
//admin - edit post 
router.get('/edit-post/:id', adminController.getPost);
router.put('/edit-post/:id', ensureAuth,adminController.updatePost);
//admin - delete post
router.delete('/delete-post/:id', ensureAuth, adminController.deletePost);
//admin - logout
router.get('/logout', adminController.getLogout);

module.exports = router;