# Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app

# Copy lock and package files first for better caching
COPY package*.json ./
COPY server/package*.json ./server/

# Copy all source files
COPY . .

# Build the server application
WORKDIR /app/server
RUN npm ci && npm run build

# Production image
FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package*.json ./

RUN npm ci --only=production

EXPOSE 10000
CMD ["node", "dist/index.js"]
