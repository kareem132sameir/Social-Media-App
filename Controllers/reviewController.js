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
      userId: req.authorizedUser.id, // Accessing the user ID from req.authorizedUser
      postId,
    });
    // Verify the user ID matches the logged-in user
    if (req.authorizedUser.id !== savedReview.userId) {
      return next(
        new AppError("User ID does not match the logged-in user", 401)
      );
    }
    const savedReview = await review.save();

    console.log("Saved Review:", savedReview);

    res.send(savedReview);
  } catch (error) {
    console.log("Review Creation Error:", error);
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(". ");
      return next(new AppError(errorMessage, 400));
    }

    return next(new AppError("Error creating review", 500));
  }
};

const updateReview = async (req, res, next) => {
  const { description, rate } = req.body;
  const reviewId = req.params.id;

  if (!description || rate === undefined) {
    return next(
      new AppError(
        "You must provide description and rate for updating the review",
        400
      )
    );
  }

  if (rate < 0 || rate > 10) {
    return next(new AppError("Rate must be a number between 0 and 10", 400));
  }

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return next(new AppError("Review not found", 404));
    }

    if (req.id !== review.userId.toString()) {
      return next(new AppError("Unauthorized", 401));
    }

    review.description = description;
    review.rate = rate;

    const updatedReview = await review.save();

    res.send({ message: "Review updated successfully", updatedReview });
  } catch (error) {
    return next(new AppError("Error updating review", 500));
  }
};

////thats data sent with delete /not sure how should we do the validation

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError("Review not found", 404));
    }

    if (req.authorizedUser.id !== review.userId.toString()) {
      return next(new AppError("Unauthorized", 401));
    }

    await Review.findByIdAndDelete(req.params.id);

    res.send({ message: "Review deleted successfully" });
  } catch (error) {
    return next(new AppError("Error deleting review", 500));
  }
};

module.exports = { createReview, updateReview, deleteReview };
