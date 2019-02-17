const Joi = require("joi");
const mongoose = require("mongoose");

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string()
      .min(3)
      .max(15)
      .required(),
    phone: Joi.string()
      .min(11)
      .required()
  };
  return Joi.validate(customer, schema);
}
const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minlength: 3, maxlength: 15 },
  phone: { type: String, required: true, minlength: 3, maxlength: 15 }
});
const Customer = mongoose.model("customer", customerSchema);

module.exports.validate = validateCustomer;
module.exports.Customer = Customer;
