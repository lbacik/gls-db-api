
const { MongoClient, ServerApiVersion } = require('mongodb')

const RepositoryInterface = require('../gls-api/repository-interface')


async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


class MongoDBRepository extends RepositoryInterface {
  constructor(url, user, pass, database) {
    super();
    this.uri = `mongodb://${user}:${pass}@${url}?retryWrites=true&w=majority`
    console.log(this.uri)

      // uri,
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // },
      // {
      //   serverApi: {
      //     version: ServerApiVersion.v1,
      //     strict: true,
      //     deprecationErrors: true,
      //   },
      // },
    // )
    this.database = database
  }

  async list() {

    let result = []

    const client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    try {

      console.log('trying to connect...')
      await client.connect()

      console.log(`set database ${this.database}`)
      const database = client.db(this.database)
      const gls = database.collection('gls_collection')

      const query = {};

      const options = {
       projection: { _id: 0, name: 1, worms: 1 },
      };

      console.log('get results...')
      const cursor = gls.find(query, options)

      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }

      await cursor.forEach((element) => {
        const item = new Object()
        item.name = element.name
        item.worms = element.worms
        result.push(item)
      }
    )

    } finally {
      await client.close()
    }

    console.log(result)

    return result
  }

  async get(name) {
    let result

    const client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    try {

      console.log('trying to connect...')
      await client.connect()

      console.log(`set database ${this.database}`)
      const database = client.db(this.database)
      const gls = database.collection('gls_collection')

      const query = {name: name};

      const options = {
        projection: { _id: 0, name: 1, worms: 1 },
      };

      console.log('get results...')
      result = await gls.findOne(query, options)

    } finally {
      await client.close()
    }

    console.log(result)

    return result

  }

  // add() {
  //
  // }
}


module.exports = MongoDBRepository
