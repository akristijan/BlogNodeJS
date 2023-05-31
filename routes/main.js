
const express = require('express');
const router = express.Router();
const Post = require("../models/Post")
const postsController = require("../controllers/posts")

//Main routes - simplified for now
router.get('/', postsController.getPosts);
router.get('/post/:id', postsController.getPostById);

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/contact', (req, res) => {
    res.render('contact')
})


/* function insertPostData() {
    Post.insertMany([
        {
            title:"Vuk samotnjak",
            body: "Learn how to live without food and water"

        },
        {
            title:"Deployment od NodeJS application",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore "
        },
        {
            title: "Understand how to work with MongoDB and Mongoose",
            body: "Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Fermentum posuere urna nec tincidunt praesent semper feugiat."

        }
    ])
}

insertPostData() */
module.exports = router;
