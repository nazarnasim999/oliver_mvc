# Use the official Node.js image as the base image
FROM node:20

# Create and change to the app directory
WORKDIR /app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run the web service on container startup
CMD ["node", "server.js"]
