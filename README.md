# Financial Aggregator API

A full-stack financial dashboard application built with Go and React, designed to track and visualize spending patterns and transactions.

## 🚀 Features

- **Go REST API** with comprehensive transaction endpoints
- **React Dashboard** with interactive charts and data tables
- **Real-time Data** visualization using Recharts
- **Responsive Design** that works on desktop and mobile
- **Docker Support** for easy deployment
- **Render Ready** with configuration files included

## 📊 API Endpoints

- `GET /api/v1/transactions` - Get all transactions
- `GET /api/v1/transactions?category=<category>` - Filter transactions by category
- `GET /api/v1/transactions/spending` - Get total spending by category
- `GET /api/v1/summary` - Get spending summary as JSON
- `GET /health` - Health check endpoint

## 🛠️ Tech Stack

### Backend
- **Go 1.21** - High-performance server
- **Gorilla Mux** - HTTP router and URL matcher
- **RESTful API** design

### Frontend
- **React 18** - Modern UI library
- **Recharts** - Data visualization
- **CSS3** - Responsive styling

## 🚀 Quick Start

### Prerequisites
- Go 1.21 or later
- Node.js 16 or later
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/benjamin-matapo/financial-aggregator.git
   cd financial-aggregator
   ```

2. **Start the Go API server**
   ```bash
   go mod download
   go run main.go
   ```
   The API will be available at `http://localhost:8080`

3. **Start the React frontend**
   ```bash
   cd react-app
   npm install
   npm start
   ```
   The dashboard will be available at `http://localhost:3000`

### Using Docker

```bash
# Build and run the API
docker build -t financial-aggregator-api .
docker run -p 8080:8080 financial-aggregator-api
```

## 🌐 Deployment on Render

This project is configured for easy deployment on Render:

1. **Connect your GitHub repository** to Render
2. **Deploy the Go API** as a Web Service
3. **Deploy the React app** as a Static Site
4. **Set environment variables**:
   - `REACT_APP_API_URL`: Your deployed API URL

### Render Configuration

The project includes:
- `render.yaml` - Render service configuration
- `Dockerfile` - Container configuration
- Environment variable support for production URLs

## 📁 Project Structure

```
financial-aggregator/
├── handlers/           # Go HTTP handlers
├── models/            # Go data models
├── react-app/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
├── main.go           # Go server entry point
├── go.mod           # Go dependencies
├── Dockerfile       # Docker configuration
├── render.yaml      # Render deployment config
└── README.md
```

## 🔧 Configuration

### Environment Variables

- `PORT` - Server port (default: 8080)
- `REACT_APP_API_URL` - API URL for React app (production)

### API Data

The API includes sample financial data for demonstration. In a production environment, you would connect to a real database.

## 📈 Sample Data

The application comes with sample transactions across categories:
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Health & Fitness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Live Demo](https://financial-dashboard.onrender.com) (when deployed)
- [API Documentation](https://financial-aggregator-api.onrender.com/health) (when deployed)
- [GitHub Repository](https://github.com/benjamin-matapo/financial-aggregator)

---

Built with ❤️ using Go and React