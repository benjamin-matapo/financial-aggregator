package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"financial-aggregator-api/models"
)

// Sample transaction data
var transactions = []models.Transaction{
	{ID: 1, Description: "Grocery shopping", Amount: -85.50, Category: "Food", Date: parseDate("2024-01-15")},
	{ID: 2, Description: "Gas station", Amount: -45.20, Category: "Transportation", Date: parseDate("2024-01-16")},
	{ID: 3, Description: "Coffee shop", Amount: -12.75, Category: "Food", Date: parseDate("2024-01-17")},
	{ID: 4, Description: "Movie tickets", Amount: -25.00, Category: "Entertainment", Date: parseDate("2024-01-18")},
	{ID: 5, Description: "Salary deposit", Amount: 3000.00, Category: "Income", Date: parseDate("2024-01-19")},
	{ID: 6, Description: "Restaurant dinner", Amount: -65.30, Category: "Food", Date: parseDate("2024-01-20")},
	{ID: 7, Description: "Uber ride", Amount: -18.50, Category: "Transportation", Date: parseDate("2024-01-21")},
	{ID: 8, Description: "Gym membership", Amount: -49.99, Category: "Health", Date: parseDate("2024-01-22")},
	{ID: 9, Description: "Online shopping", Amount: -120.45, Category: "Shopping", Date: parseDate("2024-01-23")},
	{ID: 10, Description: "Freelance payment", Amount: 500.00, Category: "Income", Date: parseDate("2024-01-24")},
}

// GetAllTransactions returns all transactions, optionally filtered by category
func GetAllTransactions(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	
	var result []models.Transaction
	
	if category == "" {
		// No category filter - return all transactions
		result = transactions
	} else {
		// Filter by category (case-insensitive)
		for _, transaction := range transactions {
			if strings.EqualFold(transaction.Category, category) {
				result = append(result, transaction)
			}
		}
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

// GetTransactionsByCategory returns transactions filtered by category
func GetTransactionsByCategory(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	if category == "" {
		http.Error(w, "Category parameter is required", http.StatusBadRequest)
		return
	}

	var filteredTransactions []models.Transaction
	for _, transaction := range transactions {
		if strings.EqualFold(transaction.Category, category) {
			filteredTransactions = append(filteredTransactions, transaction)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(filteredTransactions)
}

// GetTotalSpendingByCategory returns total spending grouped by category
func GetTotalSpendingByCategory(w http.ResponseWriter, r *http.Request) {
	categoryTotals := make(map[string]models.CategorySpending)

	for _, transaction := range transactions {
		// Only count negative amounts (expenses) for spending calculation
		if transaction.Amount < 0 {
			spending := categoryTotals[transaction.Category]
			spending.Category = transaction.Category
			spending.Total += transaction.Amount
			spending.Count++
			categoryTotals[transaction.Category] = spending
		}
	}

	// Convert map to slice
	var result []models.CategorySpending
	for _, spending := range categoryTotals {
		// Convert negative total to positive for display
		spending.Total = -spending.Total
		result = append(result, spending)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

// GetSummary returns total spending per category as a simple JSON object
func GetSummary(w http.ResponseWriter, r *http.Request) {
	categoryTotals := make(map[string]float64)

	// Calculate total spending for each category (only negative amounts)
	for _, transaction := range transactions {
		if transaction.Amount < 0 {
			// Convert negative amount to positive for display
			categoryTotals[transaction.Category] += -transaction.Amount
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categoryTotals)
}

// Helper function to parse date strings (simplified for demo)
func parseDate(dateStr string) time.Time {
	// In a real application, you'd use proper date parsing
	// For this demo, we'll return a fixed date
	return time.Date(2024, 1, 15, 0, 0, 0, 0, time.UTC)
}
