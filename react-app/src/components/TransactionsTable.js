import React from 'react';

const TransactionsTable = ({ transactions }) => {
  const formatAmount = (amount) => {
    const isPositive = amount >= 0;
    const formattedAmount = `$${Math.abs(amount).toFixed(2)}`;
    return (
      <span className={`amount ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : '-'}{formattedAmount}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryClass = (category) => {
    return `category ${category.toLowerCase()}`;
  };

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>
                <span className={getCategoryClass(transaction.category)}>
                  {transaction.category}
                </span>
              </td>
              <td>{formatAmount(transaction.amount)}</td>
              <td>{formatDate(transaction.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {transactions.length === 0 && (
        <p style={{ textAlign: 'center', color: '#718096', padding: '20px' }}>
          No transactions found
        </p>
      )}
    </div>
  );
};

export default TransactionsTable;
