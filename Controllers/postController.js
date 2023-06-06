const Post = require('../Models/posts')




const createPost = async (req, res) => {
    const { title, userId } = req.body;
    const post = new Post({ title, userId, publishDate: new Date() });
    await post.save();
    res.send({ message: 'Post created successfully', post });

  };
  
  const getAllPosts = async (req, res) => {
    const posts = await Post.find({});
    res.send({ message: 'All posts retrieved successfully', posts });

  };
  
  const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.send({ message: 'Post retrieved successfully', post });
  };
  
  const updatePostById = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send({ message: 'Post updated successfully', post });
  };
  
  const deletePostById = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.send({ message: 'Post deleted successfully' });
  };
  
  const deleteAllPosts = async (req, res) => {
    await Post.deleteMany({});
    res.send({ message: 'All posts deleted successfully' });
  };
  
  module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
    deleteAllPosts,
  };
  