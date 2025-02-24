FROM node:18  # or latest version

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Command to start the application
CMD ["node", "index.js"]
