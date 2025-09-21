# Financial Dashboard React App

A simple, clean React dashboard that displays financial transactions and spending analytics from the Go API.

## Features

- 📊 **Interactive Bar Chart** - Visual representation of spending by category using Recharts
- 📋 **Transactions Table** - Clean table showing all transactions with color-coded categories
- 🔄 **Real-time Refresh** - Button to fetch latest data from the API
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Clean UI** - Minimal, modern design with Tailwind-inspired styling

## Prerequisites

- Node.js (v14 or higher)
- The Go API server running on port 8080

## Getting Started

1. **Install dependencies:**
   ```bash
   cd react-app
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   The app will open at `http://localhost:3000`

## API Integration

The app fetches data from two endpoints:
- `GET /api/v1/transactions` - All transactions
- `GET /api/v1/summary` - Spending summary by category

## Project Structure

```
react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TransactionsTable.js
│   │   └── SpendingChart.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Components

### App.js
Main component that handles data fetching and state management.

### TransactionsTable.js
Displays transactions in a clean table format with:
- Color-coded category badges
- Formatted amounts (positive/negative)
- Sorted by date (newest first)

### SpendingChart.js
Interactive bar chart showing spending by category using Recharts library.

## Styling

The app uses custom CSS with a clean, modern design:
- Clean typography
- Subtle shadows and borders
- Color-coded categories
- Responsive grid layout
- Hover effects and transitions

## Troubleshooting

If you see "Error loading data":
1. Make sure your Go API server is running on port 8080
2. Check that the API endpoints are accessible
3. Try refreshing the page or clicking "Refresh Data"
