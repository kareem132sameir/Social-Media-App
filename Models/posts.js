// const mongoose = require('mongoose')
// const {Schema} = mongoose

// const postSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//       },
//       userId: {
//         type: String, // Change the type to String
//         required: true,
//       },
//       publishDate: {
//         type: Date,
//         default: Date.now,
//       },
//     });

// const Post = mongoose.model('Post', postSchema)
// module.exports = Post
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
