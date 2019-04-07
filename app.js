
const port = process.env.PORT || 3000
const FIREBASE_API_KEY = process.env.FIREBASE_APIKEY
const FIREBASE_URL = process.env.FIREBASE_URL

const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./src/routes')
const Factory = require('./src/infrastructure/factory')

const glsService = Factory(FIREBASE_URL, FIREBASE_API_KEY)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app, glsService)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
