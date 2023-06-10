const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../Controllers/commentController");
const routers = express.Router();

routers.post("/", createComment);
routers.patch("/:id", updateComment);
routers.delete("/:id", deleteComment);

module.exports = routers;
