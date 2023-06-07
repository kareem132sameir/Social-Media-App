const Post = require("../Models/posts");
const Comment = require("../Models/comments");
const User=require('../Models/Users');
const AppError = require("../Helpers/AppError");


/////////////get methods////////////////

//http://localhost:8080/posts/user/

const getAllPosts = async (req, res,next) => {
  const posts = await Post.find();
  if(posts.length==0) return next(new AppError('no posts found!'));
  res.send({ message: "All posts retrieved successfully", posts });
};

//http://localhost:8080/posts/:id

const getPostById = async (req, res,next) => {
  try
  {
    const post = await Post.findById(req.params.id);
    if(!post) return next(new AppError('post not found :/'));
    res.send({ message: "Post retrieved successfully", post });
  }
  catch(err)
  {
    return next(err)
  }
};

//http://localhost:8080/posts/user/:id

const getAllPostsByUser = async (req, res,next) => {
  console.log(req.params.id);
  const user=await User.findById(req.params.id);
  if(!user)return next(new AppError('user does not exist'));
  const posts = await Post.find({ userId: req.params.id });
  if(posts.length==0) return next(new AppError('no posts found!'));
  res.send({ message: "All posts retrieved successfully", posts });
};

//http://localhost:8080/posts/userposts

const getAllPostsByLoggedInUser = async (req, res,next) => {
  try
  {
    const posts = await Post.find({ userId: req.id });
    if(posts.length==0) return next(new AppError('no posts found!'));
    res.send({ message: "All posts retrieved successfully", posts });
  }
  catch(err)
  {
    return next(err)
  }
    
};

//not finished
const getAllCommentsByPost = async (req, res,next) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  if(comments.length==0) return next(new AppError('no comments yet on this post'));
  res.send({ message: "All comments retrieved successfully", comments });
};

/////////////post methods////////////////

//http://localhost:8080/posts

const createPost = async (req, res,next) => {
  const { title } = req.body;
  if(!title) return next(new AppError('please enter the post conetnt!'))
  const post = new Post({ title, userId:req.id, publishDate: new Date() });
  await post.save();
  const user=req.authorizedUser
  user.postId=post.id;
  await user.save();
  res.send({ message: "Post created successfully",post});
};

/////////////patch methods////////////////

//http://localhost:8080/posts/:id

const updatePostById = async (req, res,next) => {
  try
  {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send({ message: "Post updated successfully", post });
  }
  catch(err)
  {
    return next(err);
  }
};

/////////////delete methods////////////////

//http://localhost:8080/posts/:id

const deletePostById = async (req, res,next) => {
  try{
    const post=await Post.findById(req.params.id);
    if(!post) return next(new AppError('post does not exist'));
    if(req.authorizedUser.id==post.userId  || req.authorizedUser.role=='admin')
    {
      await Post.findByIdAndDelete(req.params.id);
      res.send({ message: "Post deleted successfully" });
    }
    else
    {
      res.send({ message: "you can't delete other users posts" });
    }
  }
  catch(err)
  {
    return next(err);
  }
};

//http://localhost:8080/posts

const deleteAllPosts = async (req, res,next) => {
  try{
    await Post.deleteMany({userId:req.id});
    res.send({ message: "All posts deleted successfully" });
  }
  catch(err)
  {
    return next(err);
  }
};

//http://localhost:8080/posts/user/:id

const deleteAllPostsByUser = async (req, res,next) => {
  const { userId } = req.params;
  try{
    await Post.deleteMany({ userId });
    res.send({ message: "All posts deleted successfully" });
  }
  catch(err)
  {
    return next(err);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  deleteAllPosts,
  getAllPostsByUser,
  deleteAllPostsByUser,
  getAllCommentsByPost,
  getAllPostsByLoggedInUser
};
