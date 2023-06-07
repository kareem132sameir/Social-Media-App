// const express = require("express");
// const app = express();
// const port = 8080;
// require("./db.js");
// const userRoutes = require("./Routes/userRoutes");
// const postRouters = require("./Routes/postRoute.js");
// const commentRouters = require("./Routes/commentRoute.js");
// const ReviewRouters = require("./Routes/reviewRoute.js");

// app.use(express.json());
// app.use(express.urlencoded());
// const authenticateUser = require("./MiddleWhere/authenticateUser.js");
// app.use("/users", userRoutes);
// // app.use('/post', postRouters)
// // app.use('/comment', commentRouters)
// app.use("/post", authenticateUser, postRouters);
// app.use("/comment", authenticateUser, commentRouters);
// app.use("/review", authenticateUser, ReviewRouters);

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });
const express = require("express");
const app = express();
const port = 8080;
require("./db.js");
const userRoutes = require("./Routes/userRoutes");
const postRouters = require("./Routes/postRoute.js");
const commentRouters = require("./Routes/commentRoute.js");
const ReviewRouters = require("./Routes/reviewRoute.js");
const verifyToken=require('./Helpers/tokenAuth.js')

app.use(express.json());
app.use(express.urlencoded());

app.use("/users", userRoutes);
app.use("/posts", verifyToken, postRouters);
app.use("/comment", verifyToken, commentRouters);
app.use("/review", verifyToken, ReviewRouters);


// Error handling middleware we can probably move it but lets wait
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
