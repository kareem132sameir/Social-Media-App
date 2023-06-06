const mongoose = require('mongoose')
const {Schema} = mongoose

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      userId: {
        type: String, // Change the type to String
        required: true,
      },
      publishDate: {
        type: Date,
        default: Date.now,
      },
    });


const Post = mongoose.model('Post', postSchema)
module.exports = Post