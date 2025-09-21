# Financial Aggregator API

A simple Go REST API for managing financial transactions with category-based filtering and spending analysis.

## Features

- Get all transactions
- Filter transactions by category
- Calculate total spending by category
- In-memory data storage (no database required)

## Project Structure

```
financial-aggregator-api/
├── main.go                 # Main application entry point
├── go.mod                  # Go module file
├── handlers/
│   └── transactions.go     # HTTP handlers for transaction endpoints
├── models/
│   └── transaction.go      # Data models
└── README.md              # This file
```

## Getting Started

1. **Install dependencies:**
   ```bash
   go mod tidy
   ```

2. **Run the application:**
   ```bash
   go run main.go
   ```

3. **The API will be available at:** `http://localhost:8080`

## API Endpoints

### Get All Transactions
```
GET /api/v1/transactions
```
Returns all transactions in the system.

### Get Transactions by Category
```
GET /api/v1/transactions/category?category=<category_name>
```
Returns transactions filtered by the specified category.

**Example:**
```bash
curl "http://localhost:8080/api/v1/transactions/category?category=Food"
```

### Get Total Spending by Category
```
GET /api/v1/transactions/spending
```
Returns total spending grouped by category (only counts expenses, not income).

### Health Check
```
GET /health
```
Returns the API status.

## Sample Data

The API comes with pre-loaded sample transactions including:
- Food expenses (groceries, coffee, restaurants)
- Transportation (gas, Uber)
- Entertainment (movies)
- Health (gym membership)
- Shopping
- Income (salary, freelance)

## Example Usage

```bash
# Get all transactions
curl http://localhost:8080/api/v1/transactions

# Get food transactions
curl "http://localhost:8080/api/v1/transactions/category?category=Food"

# Get spending summary by category
curl http://localhost:8080/api/v1/transactions/spending
```

## Dependencies

- [Gorilla Mux](https://github.com/gorilla/mux) - HTTP router and URL matcher
