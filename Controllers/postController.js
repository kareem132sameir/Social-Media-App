// const Post = require('../Models/posts')

// const createPost = async (req, res) => {
//     const { title, userId } = req.body;
//     console.log(userId)
//     const post = new Post({ title, userId, publishDate: new Date() });
//     await post.save();
//     res.send({ message: 'Post created successfully', post });

//   };

//   const getAllPosts = async (req, res) => {
//     const posts = await Post.find({});
//     res.send({ message: 'All posts retrieved successfully', posts });

//   };

//   const getPostById = async (req, res) => {
//     const post = await Post.findById(req.params.id);
//     res.send({ message: 'Post retrieved successfully', post });
//   };

//   const updatePostById = async (req, res) => {
//     const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.send({ message: 'Post updated successfully', post });
//   };

//   const deletePostById = async (req, res) => {
//     await Post.findByIdAndDelete(req.params.id);
//     res.send({ message: 'Post deleted successfully' });
//   };

//   const deleteAllPosts = async (req, res) => {
//     await Post.deleteMany({});
//     res.send({ message: 'All posts deleted successfully' });
//   };

//   module.exports = {
//     createPost,
//     getAllPosts,
//     getPostById,
//     updatePostById,
//     deletePostById,
//     deleteAllPosts,
//   };
const Post = require("../Models/posts");
const Comment = require("../Models/comments");

const createPost = async (req, res) => {
  const { title, userId } = req.body;
  const post = new Post({ title, userId, publishDate: new Date() });
  await post.save();
  res.send({ message: "Post created successfully", post });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.send({ message: "All posts retrieved successfully", posts });
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.send({ message: "Post retrieved successfully", post });
};

const updatePostById = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send({ message: "Post updated successfully", post });
};

const deletePostById = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.send({ message: "Post deleted successfully" });
};

const deleteAllPosts = async (req, res) => {
  //needs a fix
  await Post.deleteMany({});
  res.send({ message: "All posts deleted successfully" });
};

const getAllPostsByUser = async (req, res) => {
  console.log("helloworld");
  const { userId } = req.params;
  const posts = await Post.find({ userId: { $eq: userId } });
  res.send({ message: "All posts retrieved successfully", posts });
};

const deleteAllPostsByUser = async (req, res) => {
  const { userId } = req.params;
  await Post.deleteMany({ userId });
  res.send({ message: "All posts deleted successfully" });
};
const getAllCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  res.send({ message: "All comments retrieved successfully", comments });
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
};
