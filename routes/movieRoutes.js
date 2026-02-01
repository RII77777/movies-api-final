const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.post("/", authMiddleware, roleMiddleware, movieController.createMovie);
router.put("/:id", authMiddleware, roleMiddleware, movieController.updateMovie);
router.delete("/:id", authMiddleware, roleMiddleware, movieController.deleteMovie);

module.exports = router;