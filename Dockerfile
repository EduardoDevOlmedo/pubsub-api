FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
