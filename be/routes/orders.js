const express = require('express');
const Order = require('../models/order');

const router = express.Router();

// Get orders based on status
router.get('/:status?', async (req, res) => {
  try {
    const { status } = req.params;
    const query = status !== undefined ? { status } : {}; // If status is provided, filter by status

    const orders = await Order.find(query);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const { customer_email, status } = req.body;

  try {
    const newOrder = new Order({ customer_email, status });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
