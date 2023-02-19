const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await (new User(helper.initUser)).save()
})

describe('create user', () => {
  const validUser = {
    username: 'Tester',
    name: 'Test-name',
    password: 'hello-world'
  }

  test('return 201 status code with json in response', async () => {
    await api.post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('add valid user to users', async () => {
    await api.post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDb()
    const usernames = users.map(u => u.username)

    expect(users.length).toBe(2)
    expect(usernames).toContain(validUser.username)
  })

  test('return 400 status code when username is absent', async () => {
    await api.post('/api/users')
      .send({ name: validUser.name, password: validUser.password })
      .expect(400)

    const users = await helper.usersInDb()

    expect(users.length).toBe(1)
  })

  test('return 400 status code when username is less that 4 symbols', async () => {
    await api.post('/api/users')
      .send({ ...validUser, username: 'Ana' })
      .expect(400)

    const users = await helper.usersInDb()

    expect(users.length).toBe(1)
  })

  test('return 400 status code when name is absent', async () => {
    await api.post('/api/users')
      .send({ username: validUser.username, password: validUser.password })
      .expect(400)

    const users = await helper.usersInDb()

    expect(users.length).toBe(1)
  })

  test('return 400 status code when name is less than 3 symbols', async () => {
    await api.post('/api/users')
      .send({ ...validUser, name: 'JJ' })
      .expect(400)

    const users = await helper.usersInDb()

    expect(users.length).toBe(1)
  })

  test('return 400 status code when password is absent', async () => {
    await api.post('/api/users')
      .send({ username: validUser.username, name: validUser.name })
      .expect(400)

    const users = await helper.usersInDb()

    expect(users.length).toBe(1)
  })

  test('return 400 status code when password is less than 3 symbols', async () => {
    const error = await api.post('/api/users')
      .send({ username: validUser.username, name: validUser.name })
      .expect(400)

    expect(error.body.error).toBe('password must be more that 2 characters long')

    const users = await helper.usersInDb()

    expect(users.length).toBe(1)
  })

  test('return 400 status code when username is the same', async () => {
    await api.post('/api/users')
      .send({ ...validUser, username: 'root' })
      .expect(400)

    const users = await helper.usersInDb()

    expect(users.length).toBe(1)
  })
})

describe('get all users', () => {
  test('return 200 status code and response in json', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('includes all stored users', async () => {
    const users = await api.get('/api/users')

    expect(users.body.length).toBe(1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
