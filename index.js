const express = require("express");
const app = express();
const port = 8080;
require("./db.js");

const userRoutes = require("./Routes/userRoutes");
const postRouters = require("./Routes/postRoute.js");
const commentRouters = require("./Routes/commentRoute.js");
const ReviewRouters = require("./Routes/reviewRoute.js");

const verifyToken = require("./Helpers/tokenAuth.js");

app.use(express.json());
app.use(express.urlencoded());

app.use("/users", userRoutes);

app.use("/posts", verifyToken, postRouters);

app.use("/comments", verifyToken, commentRouters);

app.use("/review", verifyToken, ReviewRouters);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
