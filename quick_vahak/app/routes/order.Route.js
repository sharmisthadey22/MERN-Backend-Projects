const router = require("express").Router();
const Order = require("../models/order");
const verify = require("../verifyToken");

// CREATE ORDER
router.post("/", verify, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;