FROM node:20-slim

WORKDIR /server

COPY package*.json ./

COPY package-lock.json ./

RUN npm install --production

ENV NODE_ENV="production"

COPY . .

EXPOSE 3500

CMD ["node" , "server.js"]