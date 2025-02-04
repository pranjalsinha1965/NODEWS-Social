const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try {
        // Create a new post with the content and user ID
        await Post.create({
            content: req.body.content, 
            user: req.user._id
        });
        
        req.flash('success', 'Post published!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'Error in creating post');
        console.log('Error in creating a post:', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try {
        // Find the post by ID
        let post = await Post.findById(req.params.id);
        
        // Check if the post exists and the user is authorized
        if (post && post.user.toString() === req.user.id.toString()) {
            // Delete the post
            await post.deleteOne();

            // Remove all comments associated with the post
            await Comment.deleteMany({ post: req.params.id });
            
            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleting post:', err);
        req.flash('error', 'Error in deleting post');
        return res.redirect('back');
    }
}
