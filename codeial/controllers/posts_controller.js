const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id
    });

    return res.redirect('back');
  } catch (err) {
    console.log('Error in creating a post:', err);
    return res.redirect('back');
  }
}

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (post && post.user == req.user.id) {
      await post.deleteOne(); // Remove the post
      await Comment.deleteMany({ post: req.params.id }); // Remove related comments
      return res.redirect('back');
    } else {
      return res.status(401).send('Unauthorized');
    }

  } catch (err) {
    console.log('Error:', err);
    return res.redirect('back');
  }
};
