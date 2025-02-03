const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        // Find the post by ID
        const post = await Post.findById(req.body.post);

        if (post) {
            // Create the new comment
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            // Add the comment to the post
            post.comments.push(comment);
            await post.save();
            return res.redirect('/');
        }

        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating comment:', err);
        return res.redirect('back');
    }
};

module.exports.destroy = async function(req, res) {
    try {
        // Find the comment by ID
        const comment = await Comment.findById(req.params.id);

        if (comment.user.toString() === req.user.id.toString()) {
            const postId = comment.post;

            // Remove the comment
            await comment.remove();

            // Remove the comment reference from the post
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleting comment:', err);
        return res.redirect('back');
    }
};
