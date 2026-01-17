const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch {
    res.status(404).json({ message: "Invalid ID" });
  }
});

router.put("/:id", async (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(movie);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
});

module.exports = router;