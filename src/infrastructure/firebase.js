
const firebase = require('firebase')
const RepositoryInterface = require('../gls-api/repository-interface')

class FirebaseRepository extends RepositoryInterface
{
  constructor(databaseUrl, apiKey) {
    super()
    firebase
      .initializeApp({
        apiKey: apiKey,
        databaseURL: databaseUrl,
      })
    this.db = firebase.database()
  }

  list() {
    const event = this.db.ref('/')
    return event.once('value')
      .then(snapshot => snapshot.val())
  }

  get(name) {
    return this.db
      .ref('/')
      .child(name)
      .once('value')
      .then(snapshot => snapshot.val())
  }

  add(email, password, data) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}, ${errorMessage}`)
      });

    const db = firebase.database()

    return db
      .ref('/')
      .update(data)
  }
}

module.exports = FirebaseRepository
