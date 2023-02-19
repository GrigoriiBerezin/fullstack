const usersRoute = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRoute.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const passwordHash = password ? await bcrypt.hash(password, 10) : null
  const user = new User({ username, name, passwordHash })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRoute
