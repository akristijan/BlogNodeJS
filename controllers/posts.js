const Post = require('../models/Post');

module.exports = {

    getPosts : async (req, res) => {
        try {
            
            let perPage = 10;
            let page = req.query.page || 1;

            const posts = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

            const count = await Post.count();
            const nextPage = parseInt(page) + 1;
            const hasNextPage = nextPage <= Math.ceil(count / perPage);

            res.render('index', { 
            posts,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
            });
        } catch (error) {
            console.log(error)
        }
        


    /*     try {
            const posts = await Post.find();
            res.render('index', { posts: posts })

        } catch (error) {
            console.log(error)
        } */
    },

    getPostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            res.render('post', {post: post})
        } catch (error) {
            console.log(error)
        }
        
    },

    searchByTerm : async (req, res) => {
        
        
        try {
            let searchTerm = req.body.searchTerm;
            const noSpecialCharacters = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');
            const data = await Post.find({
                $or: [
                    {title : {$regex: new RegExp(noSpecialCharacters, 'i')}},
                    {body : {$regex: new RegExp(noSpecialCharacters, 'i')}},

                ]   
            });
            
            res.render('search', {data})
        } catch (error) {
            console.log(error)
        }
    }

}