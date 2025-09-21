import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingChart = ({ data }) => {
  // Convert the summary object to array format for recharts
  const chartData = Object.entries(data).map(([category, amount]) => ({
    category,
    amount: parseFloat(amount.toFixed(2))
  }));

  // Sort by amount (highest first)
  chartData.sort((a, b) => b.amount - a.amount);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '8px 12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: '600', color: '#2d3748' }}>
            {label}
          </p>
          <p style={{ margin: 0, color: '#4299e1' }}>
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: '#718096', 
        padding: '40px',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        No spending data available
      </div>
    );
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="category" 
            stroke="#718096"
            fontSize={12}
            tick={{ fill: '#4a5568' }}
          />
          <YAxis 
            stroke="#718096"
            fontSize={12}
            tick={{ fill: '#4a5568' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            fill="#4299e1"
            radius={[4, 4, 0, 0]}
            stroke="#3182ce"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
