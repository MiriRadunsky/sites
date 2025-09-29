const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
 
  const bearer = req.headers.authorization;
  const token =
    req.header('x-api-key') ||
    (bearer && bearer.startsWith('Bearer ') ? bearer.slice(7) : null);

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const SECRET = process.env.JWT_SECRET || 'MaorSecret';
    const decoded = jwt.verify(token, SECRET);

    req.tokenData = decoded; 
    next();
  } catch (error) {
    console.error('auth error:', error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
