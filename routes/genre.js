const express = require("express");
const { validate, Genre } = require("../modals/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort({ title: 1 });
  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("invalid id");
  //otherwise
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //otherwise
  const genre = await Movie.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("insert valid id");

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send("ID not found");

  res.send(genre);
});

module.exports = router;
