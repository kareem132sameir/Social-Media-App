const AppError=require('../Helpers/AppError');
const User=require('../Models/Users');
const bcrypt=require('bcrypt');
const {schema,verifySignUp,passwordSchema}=require('../Helpers/validationSchema');
const jwt=require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: 'dih6ijtz6', 
    api_key: '881138459648736', 
    api_secret: 'Bk73tFtZ3ayuF6s6mw9WECnDHUM' 
  });


const uploadFile=async(req,res,next)=>
{
    const token=req.headers.authorization;
    if(!token) return next(new AppError('please provide a token'))
    const user_id=jwt.verify(token,'mytoken');
    const id=user_id.id;
    const user=await User.findOne({_id:id});
    if(!user) return next(new AppError('user does not exist'));
    if(!req.file) return next(new AppError('please upload your photo'))
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.originalname
      });
    console.log(uploadResult.url);
    console.log(user.photo_url);
    user.photo_url.push(uploadResult.url);
    await user.save();
    res.send(user);
}

const getUsers=async(req,res,next)=>
{
    const users=await User.find().select("-password")
    if(users.length==0) return next(new AppError('Users not found'));
    res.send(users);
}

const signUp=async(req,res,next)=>{
    const {email,username,role,password,password_confirm}=req.body;
    if(!email ||!username || !role||!password || !password_confirm) return next(new AppError('Please enter the required info'));
    const user=await User.findOne({email});
    if(user) 
    {
        return next(new AppError('user email already exists'));
    }
    else
    {
        const hashed_password=await bcrypt.hash(password,10);
        const newUser=new User({email,username,role,password:hashed_password});
        await newUser.save();
        const token=jwt.sign({id:newUser._id},'mytoken');
        newUser.password = undefined;
        res.send({newUser,token});
    }
}

const login=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password) return next(new AppError('Please enter the required info'));
    const user_01=await User.findOne({email:email});
    const user_02=await User.findOne({username:email});
    if(user_01)
    {
        const isMatch=await user_01.checkPassword(password);
        if(!isMatch) return next(new AppError('wrong password'));
        const token=jwt.sign({id:user_01._id},'mytoken');
        user_01.password = undefined;
        res.send({user_01,token});
    }
    else if(user_02)
    {
        const isMatch=await user_02.checkPassword(password);
        if(!isMatch) return next(new AppError('wrong password'));
        const token=jwt.sign({id:user_02._id},'mytoken');
        user_02.password = undefined;
        res.send({user_02,token});
    }
    else
    {
        return next(new AppError('user does not exist')); 
    }
}

const updatePassword = async(req,res,next)=>{
    const {email,password,newPassword,newPassword_confirm} = req.body;
    if(!email || !password || !newPassword || !newPassword_confirm) return next(new AppError('Please enter the required info'));
    console.log("hello world")
    const user=await User.findOne({email:email});
    if(!user) return next(new AppError('user does not exist'));
    const isMatch = user.checkPassword(password);
    if(!isMatch) return next(new AppError('wrong password'));
    try
    {
        await passwordSchema.validateAsync({ password:newPassword,password_confirm: newPassword_confirm});
    }
    catch(err)
    {
        return next(err);
    }
    user.savePassword(newPassword);
    res.send(user);
}

const deleteUser=async (req,res,next)=>{
    const token=req.headers.authorization;
    if(!token) return next(new AppError('please provide a token'))
    const user_id=jwt.verify(token,'mytoken');
    const {email}=req.body;
    const id=user_id.id;
    const admin=await User.findById(id);
    if(!admin)
    {
        return next(new AppError('user not found'));
    }
    else
    {
        if(admin.role=='admin')
        {
            const user=await User.findOne({email:email});
            if(!user) return next(new AppError('user does not exist'));
            await User.deleteOne({email:email});
            res.send("removed user");
        }
        else
        {
            return next(new AppError('user is not an admin'));
        }
    }
    
}

module.exports={getUsers,signUp,login,updatePassword,deleteUser,uploadFile};