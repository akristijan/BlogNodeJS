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
            res.render('admin/dashboard', { data, layout: adminLayout })

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

    // GET POST 
    //Update Post 
    getPost: async (req, res) => {

        try {    
            const post = await Post.findById(req.params.id);
            console.log(post)
            res.render('admin/edit-post', {data: post, layout: adminLayout})
        }
        catch( err) {
            console.log(err)
        }
    },

    //Update Post 
    updatePost: async (req, res) => {

        try {    
            await Post.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                body: req.body.body,
                updatedAt: Date.now()
            })

            res.redirect(`/admin/edit-post/${req.params.id}`)
        }

        catch( err) {
            console.log(err)
        }
    },
    // Delete Post 
    deletePost: async (req, res) => {

        try {    
                // Find post by id
                let post = await Post.findById({ _id: req.params.id });
               
                // Delete post from db
                await Post.findByIdAndDelete(post._id );
                console.log("Deleted Post");
                res.redirect('/admin/dashboard')
        }

        catch( err) {
            console.log(err)
        }
    },

    getLogout:  (req, res) => {
        res.clearCookie('token');
        //res.json({ message: "Logout successful."})
        res.redirect('/')
    }

}