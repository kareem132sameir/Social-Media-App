const AppError = require("../Helpers/AppError");
const Comment = require("../Models/comments");
const Post = require("../Models/posts");





const createComment = async (req,res,next) => {
  try
  {
    const postId=req.params.id;
    const post=await Post.findById(postId)
    if(!post)  return next(new AppError('sorry this post no longer exists :('))
    const { description } = req.body;
    const userId = req.id  // Access the authenticated user ID from req.body
    const comment={description,publishDate:Date.now(),userId}
    post.comments.push(comment);
    await post.save();
    res.send(post);
  }
  catch(err)
  {
    return next(err);
  }
};


//wip
const updateComment = async (req,res,next) => {
  try {
    const post=await Post.findById(req.params.id);
    if(!post)return next(new AppError('post no longer exists :('))
    if (post.userId === req.id) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            'comments.$[comment].description': req.body.description,
            'comments.$[comment].publishDate': Date.now(),
          },
        },
        {
          new: true,
         }
      );
    }
    if (!comment) {
      return next(new AppError('comment not found'))
    }
    res.send({ message: "Comment updated successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComment = async (req,res,next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.send({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { createComment, updateComment, deleteComment };
