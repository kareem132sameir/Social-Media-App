const jwt=require('jsonwebtoken');
const AppError=require('../Helpers/AppError');

const verifyToken=async(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token) return next(new AppError('please provide a token'));
    const user_id=jwt.verify(token,'mytoken');
    const id=user_id.id;
    req.id=id;
    next();
}

module.exports=verifyToken;