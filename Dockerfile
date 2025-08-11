FROM node:22.13.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

# Run ng serve in dev mode, listening on all interfaces
CMD ["ng", "serve", "--host", "0.0.0.0"]
