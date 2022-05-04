FROM node:8.11.1-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 4002

CMD yarn start