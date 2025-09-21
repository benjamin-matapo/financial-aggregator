package main

import (
	"fmt"
	"log"
	"net/http"

	"financial-aggregator-api/handlers"

	"github.com/gorilla/mux"
)

func main() {
	// Create a new router
	r := mux.NewRouter()

	// Define API routes
	api := r.PathPrefix("/api/v1").Subrouter()
	
	// Transaction endpoints
	api.HandleFunc("/transactions", handlers.GetAllTransactions).Methods("GET")
	api.HandleFunc("/transactions/category", handlers.GetTransactionsByCategory).Methods("GET")
	api.HandleFunc("/transactions/spending", handlers.GetTotalSpendingByCategory).Methods("GET")
	api.HandleFunc("/summary", handlers.GetSummary).Methods("GET")

	// Health check endpoint
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "Financial Aggregator API is running!")
	}).Methods("GET")

	// Start the server
	port := ":8080"
	fmt.Printf("Server starting on port %s\n", port)
	fmt.Println("Available endpoints:")
	fmt.Println("  GET /api/v1/transactions - Get all transactions")
	fmt.Println("  GET /api/v1/transactions?category=<category> - Get transactions filtered by category")
	fmt.Println("  GET /api/v1/transactions/category?category=<category> - Get transactions by category (legacy)")
	fmt.Println("  GET /api/v1/transactions/spending - Get total spending by category")
	fmt.Println("  GET /api/v1/summary - Get spending summary as simple JSON object")
	fmt.Println("  GET /health - Health check")
	
	log.Fatal(http.ListenAndServe(port, r))
}
