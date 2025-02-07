// const Post = require('../models/post');
// const User = require('../models/user');

// module.exports.home = async function (req, res) {
//   try {
//     // Fetch posts and populate user and comments data
//     const posts = await Post.find({})
//       .populate('user')
//       .populate({
//         path: 'comments',
//         populate: {
//           path: 'user'
//         }
//       });

//     // Fetch all users
//     const users = await User.find({});

//     // Render the home view with fetched data
//     return res.render('home', {
//       title: "Codeial | Home",
//       posts: posts,
//       all_users: users
//     });

//   } catch (err) {
//     console.error("Error fetching posts or users:", err);
//     return res.status(500).send('Internal Server Error');
//   }
// };

/*
const Post = require('../models/post');
module.exports.home = function(req, res){
console.log(req.cookies);
res.cookie('user_id', 25);
Post.find({}, function(err, posts){
return res.render('home', {
title: "Codeial | Home", 
posts: posts
});
});
//populate the user of each post
Post.find({})
.populate('user')
.populate({
path: 'comments', 
populate: {
path: 'user'
}
})
.exec(function(err posts){
return res.render('home', {
title: "Codeial | Home", 
posts: posts
});
})
}

Solution using promises and all:
// using then
Post.find({}).populate('comments').then(function());
let posts = Post.find({}).populate('comments').exec();
posts.then() we will be getting the result and solution of the above variable which has
post declared. 
*/

/*
const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
try{
let posts = await Post.find({})
.populate('user')
.populate({
path: 'comments', 
populate: {
path: 'user'
}
});
let users = await User.find({});
return res.render('home', {
title: "Codeial | Home", 
posts: posts, 
all_users: users
});
}catch(err){
console.log('Error', err);
return;
}
}
*/

const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
    .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });

    let users = await User.find({});

    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.error('Error fetching home data:', err);
    return res.status(500).send('Internal Server Error');
  }
};