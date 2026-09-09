# Dockerfile for Render / Deployment (Root directory set to 'server')
FROM node:22-alpine AS builder
WORKDIR /app

# Copy server package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all server source code
COPY . .

# Build the TypeScript server code to dist/
RUN npm run build

# Production image stage
FROM node:22-alpine
WORKDIR /app

# Copy built js files and package info from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

EXPOSE 10000
CMD ["node", "dist/index.js"]
