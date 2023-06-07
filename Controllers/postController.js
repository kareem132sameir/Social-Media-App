const Post = require("../Models/posts");
const Comment = require("../Models/comments");
const User=require('../Models/Users');
const AppError = require("../Helpers/AppError");


/////////////get methods////////////////

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if(!posts) return next(new AppError('no posts found!'));
  res.send({ message: "All posts retrieved successfully", posts });
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(!post) return next(new AppError('post not found :/'));
  res.send({ message: "Post retrieved successfully", post });
};

const getAllPostsByUser = async (req, res) => {
  const posts = await Post.find({ userId: req.id });
  if(!posts) return next(new AppError('no posts found!'));
  res.send({ message: "All posts retrieved successfully", posts });
};

const getAllCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  if(!comments) return next(new AppError('no comments yet on this post'));
  res.send({ message: "All comments retrieved successfully", comments });
};


/////////////post methods////////////////

const createPost = async (req, res) => {
  const { title } = req.body;
  if(!title) return next(new AppError('please enter the post conetnt!'))
  const post = new Post({ title, userId:req.id, publishDate: new Date() });
  await post.save();
  const user=req.user;
  user.postId=post.id;
  await user.save();
  res.send({ message: "Post created successfully", post });
};


/////////////patch methods////////////////

const updatePostById = async (req, res) => {
  try
  {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  }
  catch(err)
  {
    return next(err);
  }
  res.send({ message: "Post updated successfully", post });
};


/////////////delete methods////////////////

const deletePostById = async (req, res) => {
  try{
    await Post.findByIdAndDelete(req.params.id);
  }
  catch(err)
  {
    return next(err);
  }
  res.send({ message: "Post deleted successfully" });
};

const deleteAllPosts = async (req, res) => {
  try{
    await Post.deleteMany({userId:req.id});
  }
  catch(err)
  {
    return next(err);
  }
  res.send({ message: "All posts deleted successfully" });
};

const deleteAllPostsByUser = async (req, res) => {
  const { userId } = req.params;
  try{
    await Post.deleteMany({ userId });
  }
  catch(err)
  {
    return next(err);
  }
  res.send({ message: "All posts deleted successfully" });
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
  getAllCommentsByPost
};
