const express=require('express');
const app=express();
const port=8080;
require('./db.js');
const userRoutes=require('./Routes/userRoutes');
const postRouters = require('./Routes/postRoute.js')
const commentRouters = require('./Routes/commentRoute.js')
app.use(express.json());
app.use(express.urlencoded());

app.use('/users',userRoutes);
app.use('/post', postRouters)
app.use('/comment', commentRouters)
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})

