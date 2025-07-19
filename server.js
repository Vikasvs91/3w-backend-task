const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

// ✅ Default route for http://localhost:5000/
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// API routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/claim", require("./routes/claimRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
