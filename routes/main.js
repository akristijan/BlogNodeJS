
const express = require('express');
const router = express.Router();
const Post = require("../models/Post")
const postsController = require("../controllers/posts")

//Main routes - simplified for now
router.get('/', postsController.getPosts);
router.get('/post/:id', postsController.getPostById);
router.post('/search',postsController.searchByTerm);
router.get('/about', postsController.getAbout)
router.get('/contact', postsController.getContact)


module.exports = router;
