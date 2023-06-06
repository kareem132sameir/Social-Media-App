const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
  }

  try {
    console.log('Token:', token); // Log the token
    const decodedToken = jwt.verify(token, 'mytoken'); // Replace 'your_secret_key' with your actual secret key
    console.log('Decoded Token:', decodedToken); // Log the decoded token
    req.userId = decodedToken.id; // Attach the authenticated user ID to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authenticateUser;
