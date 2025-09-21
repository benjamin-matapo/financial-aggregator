import React, { useState, useEffect } from 'react';
import TransactionsTable from './components/TransactionsTable';
import SpendingChart from './components/SpendingChart';

const API_BASE_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api/v1` 
  : process.env.NODE_ENV === 'production'
  ? '/api/v1'
  : 'http://localhost:8080/api/v1';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch transactions and summary in parallel
      const [transactionsResponse, summaryResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/transactions`),
        fetch(`${API_BASE_URL}/summary`)
      ]);

      if (!transactionsResponse.ok || !summaryResponse.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const transactionsData = await transactionsResponse.json();
      const summaryData = await summaryResponse.json();

      setTransactions(transactionsData);
      setSummary(summaryData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading financial data...</h2>
          <p>Please make sure your API server is running on port 8080</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h3>Error loading data</h3>
          <p>{error}</p>
          <p>Make sure your Go API server is running on port 8080</p>
          <button className="refresh-btn" onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>💰 Financial Dashboard</h1>
        <p>Track your spending and transactions</p>
        <button className="refresh-btn" onClick={handleRefresh}>
          🔄 Refresh Data
        </button>
      </header>

      <div className="grid">
        <div className="card">
          <h2>📊 Spending by Category</h2>
          <SpendingChart data={summary} />
        </div>

        <div className="card">
          <h2>📋 Recent Transactions</h2>
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
