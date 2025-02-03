const User = require('../models/user');

module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render('user_profile', {
      title: 'User Profile',
      profile_user: user
    });
  } catch (err) {
    console.log('Error in finding user:', err);
    return res.redirect('back');
  }
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect('back');
    } catch (err) {
      console.log('Error in updating user:', err);
      return res.redirect('back');
    }
  } else {
    return res.status(401).send('Unauthorized');
  }
};

// Render the sign-up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up', {
    title: "Codeial | Sign Up"
  });
};

// Render the sign-in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_in', {
    title: "Codeial | Sign In"
  });
};

// Handle sign-up
module.exports.create = async function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect('back');
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      return res.redirect('/users/sign-in');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in creating user during sign-up:', err);
    return res.redirect('back');
  }
};

// Handle sign-in and create session
module.exports.createSession = function (req, res) {
  return res.redirect('/');
};

// Handle sign-out
// users_controller.js
module.exports.destroySession = function (req, res) {
  req.logout();
      return res.redirect('/');  // Redirect to homepage after logging out
};
