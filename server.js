const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI = "mongodb+srv://reveille_db:billionerri777@cluster0.ubklov4.mongodb.net/?appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});