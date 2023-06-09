// const jwt=require('jsonwebtoken');
// const AppError=require('../Helpers/AppError');
// const User=require('../Models/Users');

// const verifyToken=async(req,res,next)=>{
//     const token=req.headers.authorization;
//     if(!token) return next(new AppError('please provide a token'));
//     const id=jwt.verify(token,'mytoken').id;
//     req.authorizedUser=await User.findById(id);
//     if(!req.authorizedUser) return next(new AppError('user is not found :/'));
//     req.id=id;
//     next();
// }

// module.exports=verifyToken;
// const jwt = require("jsonwebtoken");
// const AppError = require("../Helpers/AppError");
// const User = require("../Models/Users");

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return next(new AppError("Please provide a token"));

//   try {
//     const decodedToken = jwt.verify(token, "mytoken");
//     const userId = decodedToken.id;

//     const user = await User.findById(userId);
//     if (!user) return next(new AppError("User not found"));

//     // Verify that the token belongs to the user making the request
//     if (userId !== req.body.userId) {
//       return next(new AppError("Invalid token for this user"));
//     }

//     req.authorizedUser = user;
//     req.id = userId;
//     next();
//   } catch (error) {
//     return next(new AppError("Invalid token", 401));
//   }
// };

// module.exports = verifyToken;
const jwt = require("jsonwebtoken");
const AppError = require("../Helpers/AppError");
const User = require("../Models/Users");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please provide a token"));

  try {
    const decodedToken = jwt.verify(token, "mytoken");
    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user) return next(new AppError("User not found"));

    req.authorizedUser = user;
    req.body.userId = userId; // Set the userId in the request body

    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};

module.exports = verifyToken;
