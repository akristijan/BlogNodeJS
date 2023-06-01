
const express = require('express');
const router = express.Router();
const Post = require("../models/Post")
const adminController = require("../controllers/admin")

router.get("/", adminController.getAdmin);

module.exports = router;