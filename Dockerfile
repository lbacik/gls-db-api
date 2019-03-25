FROM node:11

COPY . /project
WORKDIR /project

RUN npm install

CMD node app.js
