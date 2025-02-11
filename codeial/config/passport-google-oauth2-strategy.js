const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new GoogleStrategy({
  clientID: "553152377599-vuo0t2pgi1u3tn5f0s22b98n9eg4pono.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:7862/users/auth/google/callback",
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Find user with modern async/await approach
    let user = await User.findOne({ email: profile.emails[0].value });

    if (user) {
      return done(null, user); // User exists, pass it to passport
    }

    // Create a new user if not found
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: crypto.randomBytes(20).toString('hex'),
    });

    return done(null, user);
  } catch (err) {
    console.error('Error in Google strategy:', err);
    return done(err);
  }
}));

module.exports = passport;
