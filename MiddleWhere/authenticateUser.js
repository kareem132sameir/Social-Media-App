// const jwt = require('jsonwebtoken');

// const authenticateUser = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
//   }

//   try {
//     console.log('Token:', token); // Log the token
//     const decodedToken = jwt.verify(token, 'mytoken'); // Replace 'your_secret_key' with your actual secret key
//     console.log('Decoded Token:', decodedToken); // Log the decoded token
//     req.userId = decodedToken.id; // Attach the authenticated user ID to the request object
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
//   }
// };

// module.exports = authenticateUser;

// const jwt = require('jsonwebtoken');
// const User = require('../Models/Users');

// const authenticateUser = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, 'mytoken'); // Replace 'mytoken' with your actual secret key
//     const userId = decodedToken.id;

//     // Find the user by their ID
//     const user = await User.findById(userId);
// console.log('hi',user)
//     if (!user) {
//       return res.status(401).json({ message: 'User not found.' });
//     }

//     req.user = user; // Attach the user object to the request object
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
//   }
// };

// module.exports = authenticateUser;
const jwt = require("jsonwebtoken");
const User = require("../Models/Users");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Token not provided." });
  }

  try {
    const decodedToken = jwt.verify(token, "mytoken"); // Replace 'mytoken' with your actual secret key
    const userId = decodedToken.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Set the userId on the req.body object
    console.log("hi", user);

    req.body.userId = userId;
    console.log("hi", user);

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Invalid token." });
  }
};

module.exports = authenticateUser;
