const User = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {

    const authorization = req.get('authorization');
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ error: 'Invalid authorization header' });
    }
    const bearerToken = authorization.substring(7);


    let userFromToken;
    try {
      userFromToken = jwt.verify(bearerToken, process.env.SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Find user by ID from the token
    const user = await User.findById(userFromToken.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    req.user = user;
    next();
  } catch (err) {
    
    next(err);
  }
};
