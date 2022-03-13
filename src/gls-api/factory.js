
// const FirebaseRepository = require('../infrastructure/firebase')
const MongoDBRepository = require('../infrastructure/mongodb')
const GlsService = require('./gls-service')

function firebaseBuilder(databaseUrl, apiKey) {
  const firebaseRepository = null // new FirebaseRepository(databaseUrl, apiKey)
  return new GlsService(firebaseRepository)
}

const mongodbBuilder = () => {
  const MONGODB_URL = process.env.MONGODB_URL || 'mongo.local.net:27017'
  const MONGODB_USER = process.env.MONGODB_USER || 'root'
  const MONGODB_PASS = process.env.MONGODB_PASS || 'root'
  const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'gls'
  const mongodbRepository = new MongoDBRepository(
    MONGODB_URL,
    MONGODB_USER,
    MONGODB_PASS,
    MONGO_DB_DATABASE,
  )
  return new GlsService(mongodbRepository)
}

// exports {
//   firebaseBuilder,
//   mongodbBuilder,
// }

exports.mongodbBuilder = mongodbBuilder