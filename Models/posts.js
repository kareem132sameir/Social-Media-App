const mongoose = require('mongoose')
const {Schema} = mongoose

const postSchema = new Schema({
    title:{
        type:String,
    },publishDate:{
        type:Date
    }, userId:{
        type:Number,
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post