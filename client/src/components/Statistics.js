import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../services/api";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await fetchStatistics(month);
        setStats(data);
      } catch (err) {
        setError("Failed to fetch statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [month]);

  return (
    <div className="mb-4">
      <h3>Statistics</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <div className="d-flex justify-content-between">
          <div>Total Sale Amount: ${stats.totalSaleAmount || 0}</div>
          <div>Sold Items: {stats.totalSoldItems || 0}</div>
          <div>Not Sold Items: {stats.totalNotSoldItems || 0}</div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
