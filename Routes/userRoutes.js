const express=require('express');
const routes=express();
const {getUsers,signUp,login,updatePassword,deleteUser,uploadFile}=require('../Controllers/authenticationController');
const {verifySignUp}=require('../Helpers/validationSchema');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


routes.get('/',getUsers);

routes.post('/upload', upload.single('photo'),uploadFile);

routes.post('/signup',verifySignUp,signUp);

routes.post('/login',login);

routes.patch('/',updatePassword);

routes.delete('/',deleteUser);

routes.use((err,req,res,next)=>{
	const statusCode = err.statusCode || 500;
	res.status(statusCode).send({
		status:statusCode,
		message: err?.message || 'internal server error',
		errors: err?.errors || []
	})
})

module.exports=routes;

