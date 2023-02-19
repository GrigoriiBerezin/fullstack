const usersRoute = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRoute.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password must be more that 2 characters long' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, passwordHash })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRoute.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, likes: 1 })
  response.json(users)
})

module.exports = usersRoute
