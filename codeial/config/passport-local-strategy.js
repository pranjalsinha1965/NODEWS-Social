// const passport = require('passport');

// const LocalStrategy = require('passport-local').Strategy;

// const User = require('../models/user');


// // authentication using passport
// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passReqToCallback: true
//     },
//     function(req, email, password, done){
//         // find a user and establish the identity
//         User.findOne({email: email}, function(err, user)  {
//             if (err){
//                 req.flash('error', err);
//                 return done(err);
//             }

//             if (!user || user.password != password){
//                 req.flash('error', 'Invalid Username/Password');
//                 return done(null, false);
//             }

//             return done(null, user);
//         });
//     }


// ));


// // serializing the user to decide which key is to be kept in the cookies
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });



// // deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user --> Passport');
//             return done(err);
//         }

//         return done(null, user);
//     });
// });


// // check if the user is authenticated
// passport.checkAuthentication = function(req, res, next){
//     // if the user is signed in, then pass on the request to the next function(controller's action)
//     if (req.isAuthenticated()){
//         return next();
//     }

//     // if the user is not signed in
//     return res.redirect('/users/sign-in');
// }

// passport.setAuthenticatedUser = function(req, res, next){
//     if (req.isAuthenticated()){
//         // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
//         res.locals.user = req.user;
//     }

//     next();
// }



// module.exports = passport; 
const { authenticate } = require('passport');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      try {
        // Find a user and establish identity
        let user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
          req.flash('error', 'Invalid Username/Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        req.flash('error', err.message);
        return done(err);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing the user from the key in cookies
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.error('Error in finding user --> Passport:', err);
    return done(err);
  }
});

// Check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/sign-in');
};

// Set authenticated user in locals
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
