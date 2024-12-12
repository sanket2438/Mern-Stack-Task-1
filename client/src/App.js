import React, { useState, useEffect } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

const App = () => {
  const [month, setMonth] = useState("March");

  const handleMonthChange = (event) => setMonth(event.target.value);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Transaction Dashboard</h1>
      <div className="form-group mb-4">
        <label htmlFor="month">Select Month:</label>
        <select
          id="month"
          className="form-control"
          value={month}
          onChange={handleMonthChange}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <Statistics month={month} />
      <TransactionsTable month={month} />
      <div className="row">
        <div className="col-md-6">
          <BarChart month={month} />
        </div>
        <div className="col-md-6">
          <PieChart month={month} />
        </div>
      </div>
    </div>
  );
};

export default App;
