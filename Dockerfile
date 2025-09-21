# Multi-stage build for Go API
FROM golang:1.21-alpine AS api-builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

# Production stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=api-builder /app/main .

EXPOSE 8080
CMD ["./main"]
