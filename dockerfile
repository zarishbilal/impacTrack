# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 so it can be accessed outside the container
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "start"]
