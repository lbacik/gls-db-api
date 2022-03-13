
const port = process.env.PORT || 3000

const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./src/routes')
const mongodbBuilder = require('./src/gls-api/factory').mongodbBuilder

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app, mongodbBuilder())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
