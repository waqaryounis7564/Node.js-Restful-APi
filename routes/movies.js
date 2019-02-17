const express = require("express");
const { validate, Movie } = require("../modals/movie");
const { Genre } = require("../modals/genre");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const movie = await Movie.find().sort({ title: 1 });
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send("invalid id");
  //otherwise
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //otherwise
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );

  if (!movie) return res.status(404).send("insert valid id");

  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) res.status(400).send("invalid genre");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      // both _id property and name read from genre collection that we have created genre schema
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();
  res.send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) return res.status(404).send("ID not found");

  res.send(movie);
});

module.exports = router;
