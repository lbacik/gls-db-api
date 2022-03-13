FROM node:17-alpine

COPY . /project
WORKDIR /project

RUN npm install

EXPOSE 3000

CMD node app.js
