import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTransactions({ month, page, search });
      setTransactions(data.transactions);
    };
    fetchData();
  }, [month, page, search]);

  return (
    <div>
      <h3>Transactions</h3>
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
