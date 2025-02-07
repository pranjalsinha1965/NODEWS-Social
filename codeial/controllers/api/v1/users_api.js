const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.status(422).json({
        message: 'Invalid username or password',
      });
    }

    return res.status(200).json({
      message: 'Sign in successful, here is your token',
      data: {
        token: jwt.sign(user.toObject(), 'codeial', { expiresIn: '10000' }),
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
