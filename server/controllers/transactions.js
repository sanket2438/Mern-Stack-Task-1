const Transaction = require("../models/Transaction");

exports.listTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "", month } = req.query;

  const monthNumber = new Date(`${month} 1`).getMonth();
  const query = {
    dateOfSale: {
      $gte: new Date(2022, monthNumber, 1),
      $lt: new Date(2022, monthNumber + 1, 1),
    },
  };

  if (search) {
    const searchRegex = new RegExp(search, "i"); // Create regex for strings
    const numericSearch = parseFloat(search); // Try converting search to a number

    query.$or = [
      { title: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      ...(isNaN(numericSearch) ? [] : [{ price: numericSearch }]), // Add price filter only if it's a valid number
    ];
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));
  const total = await Transaction.countDocuments(query);

  res.json({ total, transactions });
};

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1`).getMonth();

  const transactions = await Transaction.find({
    dateOfSale: {
      $gte: new Date(2022, monthNumber, 1),
      $lt: new Date(2022, monthNumber + 1, 1),
    },
  });

  const totalSaleAmount = transactions.reduce(
    (sum, t) => (t.sold ? sum + t.price : sum),
    0
  );
  const totalSoldItems = transactions.filter((t) => t.sold).length;
  const totalNotSoldItems = transactions.filter((t) => !t.sold).length;

  res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
};

exports.getBarChart = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1`).getMonth();

  const ranges = Array.from({ length: 10 }, (_, i) => [i * 100, (i + 1) * 100]);
  ranges.push([901, Infinity]);

  const transactions = await Transaction.find({
    dateOfSale: {
      $gte: new Date(2022, monthNumber, 1),
      $lt: new Date(2022, monthNumber + 1, 1),
    },
  });

  const barData = ranges.map(([min, max]) => ({
    range: `${min} - ${max === Infinity ? "Above" : max}`,
    count: transactions.filter((t) => t.price >= min && t.price < max).length,
  }));

  res.json(barData);
};

exports.getPieChart = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1`).getMonth();

  const transactions = await Transaction.find({
    dateOfSale: {
      $gte: new Date(2022, monthNumber, 1),
      $lt: new Date(2022, monthNumber + 1, 1),
    },
  });

  const categories = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(categories).map(([category, count]) => ({
    category,
    count,
  }));

  res.json(pieData);
};

exports.getCombined = async (req, res) => {
  const { month } = req.query;

  const [transactions, statistics, barChart, pieChart] = await Promise.all([
    this.listTransactions({ query: { month } }),
    this.getStatistics({ query: { month } }),
    this.getBarChart({ query: { month } }),
    this.getPieChart({ query: { month } }),
  ]);

  res.json({ transactions, statistics, barChart, pieChart });
};
