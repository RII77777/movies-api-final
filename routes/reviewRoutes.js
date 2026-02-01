const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReview);
router.post("/", authMiddleware, reviewController.createReview);
router.put("/:id", authMiddleware, reviewController.updateReview);
router.delete("/:id", authMiddleware, reviewController.deleteReview);

module.exports = router;