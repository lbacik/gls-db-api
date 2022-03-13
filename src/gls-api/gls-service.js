
class GlsService {
  constructor(repository) {
    this.repository = repository
  }

  list() {
    return this.repository
      .list()
      .then(data => data.map(element => element.name))
  }

  get(name) {
    return this.repository
      .get(name)
  }

  add(email, password, key, data) {
    const newEntry = { [key]: JSON.parse(data) }
    return this.repository
      .add(email, password, newEntry)
  }
}

module.exports = GlsService
