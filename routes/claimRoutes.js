const express = require("express");
const router = express.Router();
const User = require("../models/User");
const History = require("../models/History");

// Claim random points
router.post("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const randomPoints = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += randomPoints;
    await user.save();

    const history = new History({
      userId: user._id,
      userName: user.name,
      pointsAwarded: randomPoints,
    });

    await history.save();

    res.status(200).json({ user, randomPoints });
  } catch (error) {
    console.error("Error in POST /:id:", error.message);
    res.status(500).json({ error: "Server error while claiming points" });
  }
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in GET /leaderboard:", error.message);
    res.status(500).json({ error: "Server error while fetching leaderboard" });
  }
});

// Get history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error in GET /history:", error.message);
    res.status(500).json({ error: "Server error while fetching history" });
  }
});

module.exports = router;
