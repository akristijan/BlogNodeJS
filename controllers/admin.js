const Post = require('../models/Post');

module.exports = {
    getAdmin: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            res.render('post', {post: post})
        }
        catch( err) {
            console.log(err)
        }
    }
}