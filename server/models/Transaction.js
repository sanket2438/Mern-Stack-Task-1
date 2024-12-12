const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  sold: Boolean,
  dateOfSale: Date,
  category: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);
