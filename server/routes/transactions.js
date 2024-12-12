const express = require("express");
const {
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombined,
} = require("../controllers/transactions");

const router = express.Router();

router.get("/", listTransactions);
router.get("/statistics", getStatistics);
router.get("/bar-chart", getBarChart);
router.get("/pie-chart", getPieChart);
router.get("/combined", getCombined);

module.exports = router;
