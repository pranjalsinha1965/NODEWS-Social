const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'codeial'
};

passport.use(new JWTStrategy(opts, async function (jwtPayload, done) {
  
    let user = await User.findById(jwtPayload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
}));

module.exports = passport;
