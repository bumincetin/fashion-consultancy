# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build if needed)
RUN npm ci

# Copy application files
COPY . .

# Expose port (Cloud Run sets PORT env var automatically)
# Default to 3001 if not set
ENV PORT=3001

# Expose the port
EXPOSE $PORT

# Start the application
CMD ["node", "server.js"]

