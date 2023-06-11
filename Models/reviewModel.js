const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  // postId: {
  //   type: Schema.Types.ObjectId, // Update the data type to ObjectId
  //   ref: "Post", // Reference the "Post" model
  //   required: true,
  // },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
