// const User = require('../models/user');

// // let's keep it same as before
// module.exports.profile = function(req, res){
//     User.findById(req.params.id, function(err, user){
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user: user
//         });
//     });

// }


// module.exports.update = function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             req.flash('success', 'Updated!');
//             return res.redirect('back');
//         });
//     }else{
//         req.flash('error', 'Unauthorized!');
//         return res.status(401).send('Unauthorized');
//     }
// }


// // render the sign up page
// module.exports.signUp = function(req, res){
//     if (req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }


//     return res.render('user_sign_up', {
//         title: "Codeial | Sign Up"
//     })
// }


// // render the sign in page
// module.exports.signIn = function(req, res){

//     if (req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_in', {
//         title: "Codeial | Sign In"
//     })
// }

// // get the sign up data
// module.exports.create = function(req, res){
//     if (req.body.password != req.body.confirm_password){
//         req.flash('error', 'Passwords do not match');
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){req.flash('error', err); return}

//         if (!user){
//             User.create(req.body, function(err, user){
//                 if(err){req.flash('error', err); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             req.flash('success', 'You have signed up, login to continue!');
//             return res.redirect('back');
//         }

//     });
// }


// // sign in and create a session for the user
// module.exports.createSession = function(req, res){
//     req.flash('success', 'Logged in Successfully');
//     return res.redirect('/');
// }

// module.exports.destroySession = function(req, res){
//     req.logout();
//     req.flash('success', 'You have logged out!');


//     return res.redirect('/');
// }

// const User = require('../models/user');

// // let's keep it same as before
// module.exports.profile = function(req, res){
//     User.findById(req.params.id, function(err, user){
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user: user
//         });
//     });

// }


// module.exports.update = function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             req.flash('success', 'Updated!');
//             return res.redirect('back');
//         });
//     }else{
//         req.flash('error', 'Unauthorized!');
//         return res.status(401).send('Unauthorized');
//     }
// }


// // render the sign up page
// module.exports.signUp = function(req, res){
//     if (req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }


//     return res.render('user_sign_up', {
//         title: "Codeial | Sign Up"
//     })
// }


// // render the sign in page
// module.exports.signIn = function(req, res){

//     if (req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_in', {
//         title: "Codeial | Sign In"
//     })
// }

// // get the sign up data
// module.exports.create = function(req, res){
//     if (req.body.password != req.body.confirm_password){
//         req.flash('error', 'Passwords do not match');
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){req.flash('error', err); return}

//         if (!user){
//             User.create(req.body, function(err, user){
//                 if(err){req.flash('error', err); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             req.flash('success', 'You have signed up, login to continue!');
//             return res.redirect('back');
//         }

//     });
// }


// // sign in and create a session for the user
// module.exports.createSession = function(req, res){
//     req.flash('success', 'Logged in Successfully');
//     return res.redirect('/');
// }

// module.exports.destroySession = function(req, res){
//     req.logout();
//     req.flash('success', 'You have logged out!');


//     return res.redirect('/');
// }

// const User = require('../models/user');

// // Display user profile
// module.exports.profile = async function (req, res) {
//     try {
//         const user = await User.findById(req.params.id);
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user: user
//         });
//     } catch (err) {
//         console.error('Error fetching user profile:', err);
//         return res.status(500).send('Internal Server Error');
//     }
// }

// // Update user profile
// module.exports.update = async function (req, res) {
//     if (req.user.id == req.params.id) {
//         try {
//             await User.findByIdAndUpdate(req.params.id, req.body);
//             req.flash('success', 'Updated!');
//             return res.redirect('back');
//         } catch (err) {
//             req.flash('error', 'Error updating user.');
//             return res.redirect('back');
//         }
//     } else {
//         req.flash('error', 'Unauthorized!');
//         return res.status(401).send('Unauthorized');
//     }
// }

// // Render the sign-up page
// module.exports.signUp = function (req, res) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/users/profile');
//     }

//     return res.render('user_sign_up', {
//         title: "Codeial | Sign Up"
//     });
// }

// // Render the sign-in page
// module.exports.signIn = function (req, res) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_in', {
//         title: "Codeial | Sign In"
//     });
// }

// // Handle user sign-up
// module.exports.create = async function (req, res) {
//     if (req.body.password !== req.body.confirm_password) {
//         req.flash('error', 'Passwords do not match');
//         return res.redirect('back');
//     }

//     try {
//         const user = await User.findOne({ email: req.body.email });

//         if (!user) {
//             await User.create(req.body);
//             return res.redirect('/users/sign-in');
//         } else {
//             req.flash('success', 'You have signed up, login to continue!');
//             return res.redirect('back');
//         }
//     } catch (err) {
//         req.flash('error', err.message);
//         return res.redirect('back');
//     }
// }

// // Sign in and create a session for the user
// module.exports.createSession = function (req, res) {
//     req.flash('success', 'Logged in Successfully');
//     return res.redirect('/');
// }

// // Destroy the user session
// module.exports.destroySession = function (req, res) {
//     req.logout(function (err) {
//         if (err) {
//             req.flash('error', 'Error logging out');
//             return res.redirect('/');
//         }
//         req.flash('success', 'You have logged out!');
//         return res.redirect('/');
//     });
// }

// const User = require('../models/user');

// // Display user profile
// module.exports.profile = async function (req, res) {
//     try {
//         const user = await User.findById(req.params.id);
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user: user
//         });
//     } catch (err) {
//         console.error('Error fetching user profile:', err);
//         return res.status(500).send('Internal Server Error');
//     }
// };

// // Update user profile
// module.exports.update = async function (req, res) {
//     if (req.user.id === req.params.id) {
//         try {
//             await User.findByIdAndUpdate(req.params.id, req.body);
//             req.flash('success', 'Profile updated successfully!');
//             return res.redirect('back');
//         } catch (err) {
//             req.flash('error', 'Error updating profile.');
//             return res.redirect('back');
//         }
//     } else {
//         req.flash('error', 'Unauthorized access!');
//         return res.status(401).send('Unauthorized');
//     }
// };

// // Render the sign-up page
// module.exports.signUp = function (req, res) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_up', {
//         title: "Codeial | Sign Up"
//     });
// };

// // Render the sign-in page
// module.exports.signIn = function (req, res) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_in', {
//         title: "Codeial | Sign In"
//     });
// };

// // Handle user sign-up
// module.exports.create = async function (req, res) {
//     // Basic field validation
//     if (!req.body.email || !req.body.password || !req.body.confirm_password) {
//         req.flash('error', 'All fields are required!');
//         return res.redirect('back');
//     }

//     // Check if passwords match
//     if (req.body.password !== req.body.confirm_password) {
//         req.flash('error', 'Passwords do not match!');
//         return res.redirect('back');
//     }

//     try {
//         // Check if the user already exists
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             // Create a new user if not exists
//             await User.create(req.body);
//             req.flash('success', 'Signup successful! Please log in.');
//             return res.redirect('/users/sign-in');
//         } else {
//             req.flash('success', 'User already exists! Please log in.');
//             return res.redirect('back');
//         }
//     } catch (err) {
//         req.flash('error', err.message);
//         return res.redirect('back');
//     }
// };

// // Sign in and create a session for the user
// module.exports.createSession = function (req, res) {
//     req.flash('success', 'Logged in successfully!');
//     return res.redirect('/');
// };

// // Destroy the user session (logout)
// module.exports.destroySession = function(req, res, next){
//     req.logout(function(err) {
//         if (err) { 
//             return next(err); 
//         }
//         req.flash('success', 'You have logged out!');
//         return res.redirect('/');
//     });
// };



const fs = require('fs');
const User = require('../models/user');
const path = require('path')

// Profile
module.exports.profile = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        req.flash('error', 'Internal server error');
        return res.status(500).send('Internal Server Error');
    }
}

// Update user profile
module.exports.update = async function(req, res) {
        if (req.user.id == req.params.id) {
            try{
                let user = await User.findById(req.params.id);
                User.uploadedAvatar(req, res, function(err) {
                if(err){
                    console.log('Multer Error: ', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file) {
                    // if(user.avatar){
                    //     fstat.unlinkSync(path.join(__dirname, '..', user.avatar));
                    // }
                    // this is saving the path of the upload file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
    } catch (err) {
        req.flash('error', 'Internal server error');
        return res.redirect('back');
    }
    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send(Unauthorized);
    }
};

// Render the sign-up page
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// Render the sign-in page
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// Get the sign-up data
module.exports.create = async function(req, res) {
    if (req.body.password !== req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Create session after sign-in
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

// Destroy session on logout
// module.exports.destroySession = function(req, res) {
//     req.logout();
//     req.flash('success', 'You have logged out!');
//     return res.redirect('/');
// }

// module.exports.destroySession = function(req, res)
// {
//     console.log(`${res.locals.user.name} signed out!`)
//     req.logout();
//     req.flash('success', 'Logged Out Successfully');
//     return res.redirect('/users/sign-in');
// }

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        req.flash('success', 'You have logged out!');
        return res.redirect('/');
    });
};
