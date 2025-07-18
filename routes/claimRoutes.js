const express = require("express");
const router = express.Router();
const User = require("../models/User");
const History = require("../models/History");

// Claim random points
router.post("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const randomPoints = Math.floor(Math.random() * 10) + 1;
  user.totalPoints += randomPoints;
  await user.save();

  const history = new History({
    userId: user._id,
    userName: user.name,
    pointsAwarded: randomPoints,
  });
  await history.save();

  res.json({ user, randomPoints });
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// (Optional) Get history
router.get("/history", async (req, res) => {
  const history = await History.find().sort({ timestamp: -1 });
  res.json(history);
});

module.exports = router;
