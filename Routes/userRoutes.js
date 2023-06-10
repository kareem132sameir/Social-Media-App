const express=require('express');
const routes=express();
const {getUsers,signUp,login,updatePassword,deleteUser,uploadFile}=require('../Controllers/authenticationController');
const {verifySignUp}=require('../Helpers/validationSchema');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const verifyToken=require('../Helpers/tokenAuth');
const verifyAdmin = require('../Helpers/verifyAdmin');

//////////get methods///////////

routes.get('/',getUsers);


//////////post methods///////////

routes.post('/signup',verifySignUp,signUp);

routes.post('/login',login);

routes.post('/upload',verifyToken,upload.single('photo'),uploadFile);


//////////patch methods///////////

routes.patch('/update',verifyToken,updatePassword);


//////////delete methods///////////

routes.delete('/',verifyToken,verifyAdmin,deleteUser);

routes.use((err,req,res,next)=>{
	const statusCode = err.statusCode || 500;
	res.status(statusCode).send({
		status:statusCode,
		message: err?.message || 'internal server error',
		errors: err?.errors || []
	})
})

module.exports=routes;

