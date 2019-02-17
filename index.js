const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.Port || 3000;
const server = app.listen(port, () =>
  winston.info(`listening to port ${port}...`)
);
module.exports = server;
