const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  author: { 
    type: String, 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);