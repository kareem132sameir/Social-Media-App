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
} = require("../Controllers/postController");
const routers = express.Router();

routers.post("/", createPost);
routers.get("/", getAllPosts);
routers.get("/:id", getPostById);
routers.patch("/:id", updatePostById);
routers.delete("/:id", deletePostById);
routers.delete("/", deleteAllPosts);
routers.get("/user/:userId", getAllPostsByUser);
routers.delete("/user/:userId", deleteAllPostsByUser);
module.exports = routers;
