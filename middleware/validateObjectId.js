const mongoose = require("mongoose");

module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("invalid id");
  //other wise pass control to next m.v i.e route handler
  next();
};
