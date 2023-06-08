const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./Users");
const Post = require("./posts");

const commentSchema = new Schema({
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId, // Change the type to ObjectId
    ref: "User", // Reference the User model
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
