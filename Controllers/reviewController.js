// const Review = require("../Models/reviewModel");
// const AppError = require("../Helpers/AppError");

// const createReview = async (req, res, next) => {
//   const { description, postId, rate } = req.body;

//   console.log("Description:", description);
//   console.log("Post ID:", postId);
//   console.log("Rate:", rate);

//   if (!description || !postId || rate === undefined) {
//     return next(new AppError("You must provide all review data", 400));
//   }

//   if (rate < 0 || rate > 10) {
//     return next(new AppError("Rate must be a number between 0 and 10", 400));
//   }

//   try {
//     const review = new Review({
//       description,
//       Rate: rate,
//       userId: req.authorizedUser.id, // Accessing the user ID from req.authorizedUser
//       postId,
//     });

//     const savedReview = await review.save();
//     console.log("Saved Review:", savedReview);

//     // Verify the user ID matches the logged-in user
//     if (req.authorizedUser.id !== savedReview.userId) {
//       return next(
//         new AppError("User ID does not match the logged-in user", 401)
//       );
//     }

//     res.send(savedReview);
//   } catch (error) {
//     console.log("Review Creation Error:", error);
//     if (error.name === "ValidationError") {
//       const errorMessage = Object.values(error.errors)
//         .map((err) => err.message)
//         .join(". ");
//       return next(new AppError(errorMessage, 400));
//     }

//     return next(new AppError("Error creating review", 500));
//   }
// };

// const updateReview = async (req, res, next) => {
//   const { description, rate } = req.body;

//   if (!description || rate === undefined) {
//     return next(
//       new AppError(
//         "You must provide description and rate for updating the review",
//         400
//       )
//     );
//   }

//   try {
//     const updatedReview = await Review.findOneAndUpdate(
//       { _id: req.params.id, userId: req.authorizedUser.id }, // Using both id and userId in the query
//       req.body,
//       { new: true }
//     );

//     if (!updatedReview) {
//       return next(new AppError("Review not found", 404));
//     }

//     // Verify the user ID matches the logged-in user
//     if (req.authorizedUser.id !== updatedReview.userId) {
//       return next(
//         new AppError("User ID does not match the logged-in user", 401)
//       );
//     }

//     res.send(updatedReview);
//   } catch (error) {
//     return next(new AppError("Error updating review", 500));
//   }
// };

// const deleteReview = async (req, res, next) => {
//   try {
//     const deletedReview = await Review.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.authorizedUser.id, // Adding userId to the query
//     });

//     if (!deletedReview) {
//       return next(new AppError("Review not found", 404));
//     }

//     // Verify the user ID matches the logged-in user
//     if (req.authorizedUser.id !== deletedReview.userId) {
//       return next(
//         new AppError("User ID does not match the logged-in user", 401)
//       );
//     }

//     res.send("Review deleted successfully");
//   } catch (error) {
//     return next(new AppError("Error deleting review", 500));
//   }
// };

// module.exports = { createReview, updateReview, deleteReview };
const Review = require("../Models/reviewModel");
const Post = require("../Models/posts");
const AppError = require("../Helpers/AppError");

const createReview = async (req, res, next) => {
  const { description, postId, rate } = req.body;

  console.log("Description:", description);
  console.log("Post ID:", postId);
  console.log("Rate:", rate);

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
      Rate: rate,
      userId: req.authorizedUser.id, // Accessing the user ID from req.authorizedUser
      postId,
    });

    const savedReview = await review.save();
    console.log("Saved Review:", savedReview);

    // Verify the user ID matches the logged-in user
    if (req.authorizedUser.id !== savedReview.userId) {
      return next(
        new AppError("User ID does not match the logged-in user", 401)
      );
    }

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
// const updateReview = async (req, res, next) => {
//   const { description, postId, rate } = req.body;

//   if (!description || rate === undefined || !postId) {
//     return next(
//       new AppError(
//         "You must provide description, rate, and postId for updating the review",
//         400
//       )
//     );
//   }

//   try {
//     const post = await Post.findById(postId);

//     if (!post) {
//       return next(new AppError("Post not found", 404));
//     }

//     const updatedReview = await Review.findOneAndUpdate(
//       { _id: req.params.id, userId: req.authorizedUser.id },
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedReview) {
//       return next(new AppError("Review not found", 404));
//     }

//     // Verify the user ID matches the logged-in user
//     if (req.authorizedUser.id !== updatedReview.userId) {
//       return next(
//         new AppError("User ID does not match the logged-in user", 401)
//       );
//     }

//     res.send(updatedReview);
//   } catch (error) {
//     return next(new AppError("Error updating review", 500));
//   }
// };
const updateReview = async (req, res, next) => {
  const { description, rate } = req.body;

  if (!description || rate === undefined) {
    return next(
      new AppError(
        "You must provide description and rate for updating the review",
        400
      )
    );
  }

  try {
    const review = await Review.findOne({
      _id: req.params.id,
      userId: req.authorizedUser.id,
    });

    if (!review) {
      return next(new AppError("Review not found", 404));
    }

    // Compare the review ID with the created review ID
    if (req.params.id !== review._id.toString()) {
      return next(new AppError("Invalid review ID", 400));
    }

    // Update the review properties
    review.description = description;
    review.Rate = rate;

    const updatedReview = await review.save();

    // Verify the user ID matches the logged-in user
    if (req.authorizedUser.id !== updatedReview.userId.toString()) {
      return next(
        new AppError("User ID does not match the logged-in user", 401)
      );
    }

    res.send(updatedReview);
  } catch (error) {
    return next(new AppError("Error updating review", 500));
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const deletedReview = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.authorizedUser.id, // Adding userId to the query
    });

    if (!deletedReview) {
      return next(new AppError("Review not found", 404));
    }

    // Verify the user ID matches the logged-in user
    if (req.authorizedUser.id !== deletedReview.userId) {
      return next(
        new AppError("User ID does not match the logged-in user", 401)
      );
    }

    res.send("Review deleted successfully");
  } catch (error) {
    return next(new AppError("Error deleting review", 500));
  }
};

module.exports = { createReview, updateReview, deleteReview };
