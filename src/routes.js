
module.exports = function(app, glsService) {

  app.get('/list', (req, res) => {
    glsService.list()
      .then(data => res.json(data).end())
  })

  app.get('/get/:name', (req, res) => {
    glsService.get(req.params.name)
      .then(data => res.json(data).end())
  })

  app.post('/add', (req, res) => {
    const name = req.body.name
    const data = req.body.data
    const email = req.body.email
    const password = req.body.password
    glsService.add(email, password, name, data)
      .then(data => res.json(data).end())
  })
}
