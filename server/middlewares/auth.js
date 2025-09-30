const jwt = require('jsonwebtoken');
const { config } = require('../config/secret');


exports.auth = (req, res, next) => {
 
  const bearer = req.headers.authorization;
  const token =
    req.header('x-api-key') ||
    (bearer && bearer.startsWith('Bearer ') ? bearer.slice(7) : null);

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const SECRET = config.tokenSecret;
    const decoded = jwt.verify(token, SECRET);

    req.tokenData = decoded; 
    next();
  } catch (error) {
    console.error('auth error:', error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

exports.authAdmin = (req, res, next) => {
 
  const bearer = req.headers.authorization;
  const token =
    req.header('x-api-key') ||
    (bearer && bearer.startsWith('Bearer ') ? bearer.slice(7) : null);

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const SECRET = config.tokenSecret;
    const decoded = jwt.verify(token, SECRET);
   if (decoded.role !== 'admin') {
      return res.status(403).json({ msg: 'You are not admin , access denied' });
    }

    req.tokenData = decoded; 
    next();
  } catch (error) {
    console.error('auth error:', error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


