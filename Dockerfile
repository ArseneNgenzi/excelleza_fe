FROM node:22.13.1

# Install Angular CLI globally for ng serve
RUN npm install -g @angular/cli

WORKDIR /app

# Copy only package files first for dependency caching
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the Angular dev server port
EXPOSE 4200

# Run ng serve in dev mode, listening on all interfaces
CMD ["ng", "serve"]
