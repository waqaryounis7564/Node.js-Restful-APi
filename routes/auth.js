const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User } = require("../modals/user");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("incorrect email or password");

  let password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send("incorrect email or password");
  //finally
  const token = user.generateAuthToken();

  res.send(token);
});
function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema);
}
module.exports = router;
