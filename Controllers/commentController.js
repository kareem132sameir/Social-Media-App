const Comment = require('../Models/comments')

const createComment = async(req, res)=>{
    const {description, userId, postId} = req.body
    const comment = new Comment({description, publishDate:new Date(), userId, postId})
    await comment.save()
    res.send(comment)
}

const updateComment = async(req, res) => {
    const comment = await Comment.findByIdAndUpdate({_id:req.params.id}, req.body)
    res.send(comment)
}

const deleteComment = async(req, res) => {
    await Comment.findByIdAndDelete({_id:req.params.id})
    res.send("Comment Deleted Successfully !!")
}

module.exports = {createComment, updateComment, deleteComment}