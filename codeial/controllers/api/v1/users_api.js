const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.json(422, {
        message: 'Invalid username or password',
      });
    }

    return res.json(200, {
      message: 'Sign in successful, here is your token, please keep it safe !',
      data: {
        token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' })
      }
    });
  } catch (err) {
    console.error('******', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
