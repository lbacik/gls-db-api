
const port = process.env.PORT || 3000
const firebase_api_key = process.env.FIREBASE_APIKEY
const firebase_url = process.env.FIREBASE_URL

const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./src/routes')
const Factory = require('./src/infrastructure/factory')

const glsService = Factory(firebase_url, firebase_api_key)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app, glsService)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
