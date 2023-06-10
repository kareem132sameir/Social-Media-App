const Review = require("../Models/reviewModel");
const Post = require("../Models/posts");
const AppError = require("../Helpers/AppError");
const User = require("../Models/Users");

const createReview = async (req, res, next) => {

  const { description, postId, rate } = req.body;
  if (!description || !postId || rate === undefined) {
    return next(new AppError("You must provide all review data", 400));
  }
  if (rate < 0 || rate > 10) {
    return next(new AppError("Rate must be a number between 0 and 10", 400));
  }
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next(new AppError("Post not found", 404));
    }

    const review = new Review({
      description,
      rate: rate,
      userId: req.id, // Accessing the user ID from req.authorizedUser
      postId
    });

    const savedReview = await review.save();
    console.log("Saved Review:", savedReview);
    res.send(savedReview);
  } catch (error) 
  {
    return next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { description, rate } = req.body;
    const reviewId = req.params.id;
    if (!description || rate === undefined)
      return next(
        new AppError(
          "You must provide description and rate for updating the review"
        )
      );
    if (rate < 0 || rate > 10) {
      return next(new AppError("Rate must be a number between 0 and 10", 400));
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      return next(new AppError("Review not found", 404));
    }
    if (req.id != review.userId) {
      return next(new AppError("Unauthorized", 401));
    }
    review.description = description;
    review.rate = rate;
    const updatedReview = await review.save();
    res.send({ message: "Review updated successfully", updatedReview });
  } 
  catch (error) 
  {
    return next(new AppError("Error updating review", 500));
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new AppError("Review not found", 404));
    }
    if (review.userId == req.id || req.authorizedUser.role == "admin") {
      await Review.findByIdAndDelete(req.params.id);
      res.send({ message: "Review deleted successfully" });
    } else {
      return next(new AppError("Unauthorized", 401));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createReview, updateReview, deleteReview };
