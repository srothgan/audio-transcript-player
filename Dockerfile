# Use the official Node image as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000 (or whatever port your app runs on)
EXPOSE 3000

# Run the app in production mode
CMD ["npm", "start"]
