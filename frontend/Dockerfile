FROM node:15.6.0

WORKDIR /usr/src/app

ENV PORT 80

COPY package*.json ./

RUN npm install

COPY ./ ./


CMD [ "npm", "start" ]