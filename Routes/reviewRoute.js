const express = require("express");
const {
  createReview,
  updateReview,
  deleteReview,
} = require("../Controllers/reviewController");
const router = express.Router();

router.post("/", createReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
