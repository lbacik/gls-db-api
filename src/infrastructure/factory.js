
const FirebaseRepository = require('./firebase')
const GlsService = require('../gls-api/gls-service')

function create(databaseUrl, apiKey) {
  const firebaseRepository = new FirebaseRepository(databaseUrl, apiKey)
  return new GlsService(firebaseRepository)
}

module.exports = create
