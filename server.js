const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ✅ Default route for testing root
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// ✅ Test route for Render deployment
app.get("/api/test", (req, res) => {
  res.send("API is working ✅");
});

// API routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/claim", require("./routes/claimRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
