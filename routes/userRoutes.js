const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// Add new user
router.post("/", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.status(201).json(user);
});

module.exports = router;
