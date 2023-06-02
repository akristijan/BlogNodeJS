const User = require('../models/User');
const Post = require('../models/Post');
const adminLayout = '../views/layouts/admin';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = {

    //Admin - Login
    checkLogin: async (req, res) => {
        try {
            const { username, password} = req.body;

            const user = await User.findOne({ username });

            if(!user) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!password) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            const token = jwt.sign({userId: user._id}, jwtSecret)
            res.cookie('token', token, { httpOnly: true })
            res.redirect('/admin/dashboard')
        }

        catch( err) {
            console.log(err)
        }
    },

    getDashboard:  async (req, res) => {
        try {
            const data = await Post.find();
            res.render('admin/dashboard', { data })

        } catch (error) {
            console.log(error)
        }
    },

    registerUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            try {
                const user = await User.create({username, password: hashedPassword});
                res.status(201).json({ message : 'User created', user})

            } catch (error) {
                if(error.code === 11000) {
                    res.status(409).json({ message: 'User already in use'});
                }
                res.status(500).json({ message: 'Internal server error'})
            }
            
        } catch( err) {
            console.log(err)
        }
    },


    createUser: async (req, res) => {

        try {
            
            res.render('admin/login', { layout: adminLayout})
        }

        catch( err) {
            console.log(err)
        }
    },
    
    getAdmin: async (req, res) => {

        try {
            
            res.render('admin/login', { layout: adminLayout})
        }

        catch( err) {
            console.log(err)
        }
    },

    addPost: async (req, res) => {
        try {
            
            res.render("admin/add-post", { layout: adminLayout });

        } catch (error) {
            
        }
    },

    createPost: async (req, res) => {

        try {    
                const {title, body} = req.body;
                const newPost = await Post.create( { title, body } );
                console.log("Post has been added!");
                res.redirect('/admin/dashboard')
        }

        catch( err) {
            console.log(err)
        }
    },

}