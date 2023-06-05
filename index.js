const express=require('express');
const app=express();
const port=8080;
require('./db.js');
const userRoutes=require('./Routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded());

app.use('/users',userRoutes);

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})

