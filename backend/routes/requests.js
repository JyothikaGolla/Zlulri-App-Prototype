const express = require('express');
const router = express.Router();
const Request = require('../models/Request'); // Request schema with: userId, appId, status

// Get requests by userId
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "Missing userId" });

  try {
    const requests = await Request.find({ userId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new request
router.post('/', async (req, res) => {
  const { userId, appId, status } = req.body;
  try {
    const existing = await Request.findOne({ userId, appId });
    if (existing) return res.json({ message: "You already requested this app!" });

    const newRequest = new Request({ userId, appId, status });
    await newRequest.save();
    res.json({ message: "Request submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
