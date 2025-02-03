const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using passport
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // Find a user and establish the identity
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
          console.log('Invalid Username/Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log('Error in finding user --> Passport');
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

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
