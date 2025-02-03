const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
  try {
    // Fetch posts and populate user and comments data
    const posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });

    // Fetch all users
    const users = await User.find({});

    // Render the home view with fetched data
    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users: users
    });

  } catch (err) {
    console.error("Error fetching posts or users:", err);
    return res.status(500).send('Internal Server Error');
  }
};
