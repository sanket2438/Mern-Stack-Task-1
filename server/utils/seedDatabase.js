const axios = require("axios");
const Transaction = require("../models/Transaction");

const seedDatabase = async () => {
  const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

  try {
    const response = await axios.get(url); // Fetch JSON data
    const data = response.data;

    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(data); // Insert fetched data

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

module.exports = seedDatabase;
