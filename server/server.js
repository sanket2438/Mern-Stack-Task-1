const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const seedDatabase = require("./utils/seedDatabase");
const transactionRoutes = require("./routes/transactions");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mernChallenge", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/transactions", transactionRoutes);

// Seed Database Endpoint
app.get("/api/init", async (req, res) => {
  try {
    await seedDatabase();
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database seeding failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
