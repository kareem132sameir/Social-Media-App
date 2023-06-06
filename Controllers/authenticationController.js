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
    ///////////////// <-finding user-> /////////////////////
    const user=await User.findOne({_id:req.id});
    if(!user) return next(new AppError('user does not exist'));

    ///////////////// <-checking the uploaded file-> /////////////////////
    if(!req.file) return next(new AppError('please upload your photo'))
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename
      });
      console.log(uploadResult);
      console.log(req.file);
    ///////////////// <-pushing the uploaded photo url to the user photos-> /////////////////////
    user.photo_url.push(uploadResult.url);
    await user.save();
    user.password=undefined;
    res.send(user);
}

const getUsers=async(req,res,next)=>
{
    const users=await User.find().select("-password")
    if(users.length==0) return next(new AppError('Users not found'));
    res.send(users);
}

const signUp=async(req,res,next)=>{
    ///////////////// <-checking input-> /////////////////////
    const {email,username,role,password,password_confirm}=req.body;
    if(!email ||!username || !role||!password || !password_confirm) return next(new AppError('Please enter the required info'));
    
    ///////////////// <-checking if user exists-> /////////////////////
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
    /////////////////checking email and password/////////////////////
    const {email,password}=req.body;
    if(!email || !password) return next(new AppError('Please enter the required info'));
    
    /////////////////finding the user/////////////////////
    const user=await User.findOne({email});
    if(!user) return next(new AppError('user does not exist'))
    
    /////////////////checking if email matches entered password/////////////////////
    const isMatch=await user.checkPassword(password);
    if(!isMatch) return next(new AppError('wrong password'));
    
    /////////////////sendin a token to the user/////////////////////
    const token=jwt.sign({id:user._id},'mytoken');
    user.password = undefined;
    res.send({user,token});
}

const updatePassword = async(req,res,next)=>{
    ///////////////// <-finding user-> /////////////////////
    const user=await User.findOne({_id:req.id});
    if(!user) return next(new AppError('user does not exist'));

    ///////////////// <-checking input-> /////////////////////
    const {email,password,newPassword,newPassword_confirm} = req.body;
    if(!email || !password || !newPassword || !newPassword_confirm) return next(new AppError('Please enter the required info'));

    ///////////////// <-checking old password-> /////////////////////
    const isMatch = await user.checkPassword(password);
    if(!isMatch) return next(new AppError('wrong password'));
    try
    {
        await passwordSchema.validateAsync({ password:newPassword,password_confirm: newPassword_confirm});
    }
    catch(err)
    {
        return next(err);
    }
    await user.savePassword(newPassword);
    user.password=undefined;
    res.send(user);
}

const deleteUser=async (req,res,next)=>{

    const admin=await User.findById(req.id);
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