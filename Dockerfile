FROM node:10

WORKDIR /pelmorex

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 5000

CMD [ "npm", "run", "start:server:dev" ]
