const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  deleteAllPosts,
  getAllPostsByUser,
  deleteAllPostsByUser,
  getAllCommentsByPost
} = require("../Controllers/postController");
const verifyAdmin = require("../Helpers/verifyAdmin");
const routers = express.Router();


/////////////get methods////////////////
routers.get("/", getAllPosts);
routers.get("/:id", getPostById);
routers.get("/user/:userId", getAllPostsByUser);
routers.get("/:postId/comments", getAllCommentsByPost); // Add this line


/////////////post methods////////////////
routers.post("/", createPost);


/////////////patch methods////////////////
routers.patch("/:id", updatePostById);


/////////////delete methods////////////////
routers.delete("/:id", deletePostById);
routers.delete("/", deleteAllPosts);


/////////////Admin delete methods////////////////
routers.delete("/user/:userId",verifyAdmin,deleteAllPostsByUser);


module.exports = routers;
