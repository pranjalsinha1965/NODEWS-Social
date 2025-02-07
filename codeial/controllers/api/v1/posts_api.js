const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort('createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });

    return res.status(200).json({
      message: "List of posts",
      posts: posts
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove the post
    await post.remove();

    // Remove all comments associated with the post
    await Comment.deleteMany({ post: req.params.id });

    return res.status(200).json({
      message: "Post and associated comments deleted successfully"
    });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
