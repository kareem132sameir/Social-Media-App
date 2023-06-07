const Review = require("../Models/reviewModel");

const createReview = async (req, res) => {
  const { description, userId, postId } = req.body;
  const review = new Review({
    description,
    publishDate: new Date(),
    userId,
    postId,
  });
  await review.save();
  res.send(review);
};

const updateReview = async (req, res) => {
  const review = await Review.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.send(review);
};

const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete({ _id: req.params.id });
  res.send("review Deleted Successfully !!");
};

module.exports = { createReview, updateReview, deleteReview };
