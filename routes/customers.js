const express = require("express");
const { validate, Customer } = require("../modals/customer");

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Invalid id");
  //otherwise
  res.send(customer);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });
  await customer.save();
  res.send(customer);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOneAndUpdate(
    req.params.id,
    { isGold: req.body.isGold, name: req.body.name, phone: req.body.phone },
    { new: true }
  );
  if (!customer) return res.status(404).send("invalid id");
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send("Invalid id");

  res.send(customer);
});

module.exports = router;
