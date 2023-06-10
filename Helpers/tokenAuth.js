const jwt = require("jsonwebtoken");
const AppError = require("../Helpers/AppError");
const User = require("../Models/Users");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("please provide a token"));
  const id = jwt.verify(token, "mytoken").id;
  req.authorizedUser = await User.findById(id);
  if (!req.authorizedUser) return next(new AppError("user is not found or invalid token:/"));
  req.id = id;
  next();
};

module.exports = verifyToken;


