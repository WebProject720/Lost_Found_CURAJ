# Use the Node.js version

FROM node:22

# Set the directory

WORKDIR /usr/src/app

COPY package*.json ./

# Dependencies

RUN npm install

COPY . .

# Set port

EXPOSE 5000

# Run the application

CMD ["node", "index.js"]



