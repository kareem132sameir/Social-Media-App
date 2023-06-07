const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  description: {
    type: String,
  },
  Rate: {
    type: String,
  },
  userId: {
    type: String,
  },
  postId: {
    type: String,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
