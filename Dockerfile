FROM node:11-alpine

COPY . /project
WORKDIR /project

RUN npm install

EXPOSE 3000

CMD node app.js
