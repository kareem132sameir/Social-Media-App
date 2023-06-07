// const Comment = require('../Models/comments')

// const createComment = async(req, res)=>{
//     const {description, userId, postId} = req.body
//     const comment = new Comment({description, publishDate:new Date(), userId, postId})
//     await comment.save()
//     res.send(comment)
// }

// const updateComment = async(req, res) => {
//     const comment = await Comment.findByIdAndUpdate({_id:req.params.id}, req.body)
//     res.send(comment)
// }

// const deleteComment = async(req, res) => {
//     await Comment.findByIdAndDelete({_id:req.params.id})
//     res.send("Comment Deleted Successfully !!")
// }

// module.exports = {createComment, updateComment, deleteComment}

// const createComment = async (req, res) => {
//   const { description, postId } = req.body;
//   const userId = req.user.id; // Assuming the authenticated user ID is available in req.user

//   try {
//     const comment = new Comment({
//       description,
//       publishDate: new Date(),
//       userId,
//       postId,
//     });

//     await comment.save();

//     res.send({ message: 'Comment created successfully', comment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
const Comment = require("../Models/comments");

const createComment = async (req, res) => {
  const { description, postId } = req.body;
  const userId = req.body.userId; // Access the authenticated user ID from req.body

  const comment = new Comment({
    description,
    publishDate: new Date(),
    userId,
    postId,
  });

  await comment.save();
  res.send(comment);
};
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.send({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
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
