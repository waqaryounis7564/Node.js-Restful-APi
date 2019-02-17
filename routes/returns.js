const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Genre } = require("../modals/genre");

router.post("/", async (req, res) => {
  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.status(400).send("unauthorized");
});

module.exports = router;
