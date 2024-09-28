# Dockerfile

# Use the official Node.js image.
FROM node:14

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install app dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the port the app runs on.
EXPOSE 6060

# Command to run the app.
CMD ["node", "app.js"]

