# Stage 1: Build
FROM node:16-buster as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Install globally packages
RUN npm install -g vite

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM node:16-buster-slim
WORKDIR /app

# Set Node.js to production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096

# Install 'serve' for static file serving
RUN npm install -g serve

# Copy build directory from build stage
COPY --from=build /app/dist ./build

# Expose the port that your application will run on
EXPOSE 5173

# Start the static file server, listening on port 5173
CMD ["sh", "-c", "serve -s build -l ${PORT:-5173}"]
