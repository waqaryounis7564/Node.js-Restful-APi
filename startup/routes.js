const express = require("express");

const movieRoute = require("../routes/movies");
const customerRoute = require("../routes/customers");
const genreRoute = require("../routes/genre");
const rentalRoute = require("../routes/rentals");
const userRoute = require("../routes/users");
const authRoute = require("../routes/auth");
const returnsRoute = require("../routes/returns");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/movies", movieRoute);
  app.use("/api/customers", customerRoute);
  app.use("/api/genres", genreRoute);
  app.use("/api/rentals", rentalRoute);
  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/returns", returnsRoute);
  app.use(error);
};
