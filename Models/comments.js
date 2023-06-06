const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new Schema({
    description:{
        type:String,
    },publishDate:{
        type:Date
    }, userId:{
        type:Number,
    }, 
    postId:{
        type:Number
    }
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment