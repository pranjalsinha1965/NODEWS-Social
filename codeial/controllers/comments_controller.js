const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentsEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');

module.exports.create = async function(req, res) {
    try {
        // Check if post ID and content are present in the request body
        if (!req.body.post || !req.body.content) {
            req.flash('error', 'Post ID and content are required.');
            return res.redirect('back');
        }

        // Find the post by ID
        let post = await Post.findById(req.body.post);

        if (post) {
            // Create the new comment
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // Add the comment to the post
            post.comments.push(comment);
            await post.save();
            
            // Populate and send email notification
            comment = await comment.populate('user', 'name email');
            commentsMailer.newComment(comment);
            let job = queue.create('emails', comment);
            job.save(function(err){
                if(err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log("job queued", job.id);
            });
            

            req.flash('success', 'Comment published!');
            return res.redirect('/');
        } else {
            req.flash('error', 'Post not found.');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in creating comment:', err);
        req.flash('error', 'Error in creating comment.');
        return res.redirect('back');
    }
};


module.exports.destroy = async function(req, res) {
    try {
        // Find the comment by ID
        let comment = await Comment.findById(req.params.id);

        if (comment && comment.user.toString() === req.user.id.toString()) {
            let postId = comment.post;

            // Remove the comment using findByIdAndDelete
            await Comment.findByIdAndDelete(req.params.id);

            // Remove the comment reference from the post
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleting comment:', err);
        req.flash('error', 'Error in deleting comment.');
        return res.redirect('back');
    }
};
