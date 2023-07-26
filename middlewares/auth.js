
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Authentication token not found.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid authentication token.' });
  }
}

module.exports = authMiddleware;
