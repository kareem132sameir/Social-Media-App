const express = require('express');
const {createComment, updateComment, deleteComment} = require('../Controllers/commentController')
const routers = express.Router();

routers.post('/', createComment)
routers.delete('/:id', updateComment)
routers.patch('/:id', deleteComment)

module.exports = routers