const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');  // Ensure you have a User model in your project

// Authentication using Passport Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, // Specify the field to use for username (e.g., email)
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and if passwords match
        if (!user || user.password !== password) {
          console.log('Invalid Username/Password');
          return done(null, false, { message: 'Invalid Username/Password' });
        }

        // If authentication is successful, pass the user object
        return done(null, user);
      } catch (err) {
        console.log('Error in finding user --> Passport', err);
        return done(err);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
  // Store only the user ID in the session (to minimize session data)
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by ID from the database
    const user = await User.findById(id);
    
    // If user is found, pass it along
    done(null, user);
  } catch (err) {
    console.log('Error in finding user --> Passport');
    done(err);
  }
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If authenticated, move to the next middleware
    return next();
  }
  // If not authenticated, redirect to the login page
  return res.redirect('/users/sign-in');
};

// Middleware to set authenticated user in locals
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If user is authenticated, set user in res.locals to make it available in all views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;