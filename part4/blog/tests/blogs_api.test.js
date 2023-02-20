const mongoose = require('mongoose')
const helper = require('./test_helper')
const config = require('../utils/config')
const app = require('../app')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token
let userId

beforeAll(async () => {
  const user = helper.initUser

  await User.deleteMany({})
  const { id, newToken } = await helper.createTokenWithId(user)
  userId = id
  token = newToken
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initBlogs.map(b => ({ ...b, user: userId })))
})

describe('get all blogs', () => {
  test('return json type response', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('return exact amount of blogs', async () => {
    const blogs = await api.get('/api/blogs')

    expect(blogs.body.length).toBe(helper.initBlogs.length)
  })

  test('the first blog is within returned blogs', async () => {
    const blogs = await api.get('/api/blogs')

    const contents = blogs.body.map(b => b.title)

    expect(contents).toContain('TDD harms architecture')
  })

  test('blog contains id instead of _id field', async () => {
    const blogs = await api.get('/api/blogs')

    const content = blogs.body[0]

    expect(content.id).toBeDefined()
  })
})

describe('create blog', () => {
  const newBlog = {
    title: 'New blog title',
    author: 'Tester',
    url: 'https://google.com',
    likes: 5
  }

  test('increase amount of blogs', async () => {
    await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)

    const updatedBlogs = await helper.blogsInDb()

    expect(updatedBlogs.length).toBe(helper.initBlogs.length + 1)
  })

  test('return id of created blog', async () => {
    const newId = (await api.post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog))
      .body
      .id

    const theLastBlog = await helper.theLastBlog()

    expect(theLastBlog.id).toBe(newId)
    expect(theLastBlog.title).toBe(newBlog.title)
  })

  test('insert likes to zero if likes field is missing', async () => {
    const blogWithNoLikes = {
      title: 'New blog title',
      author: 'Tester',
      url: 'https://google.com'
    }

    await api.post('/api/blogs').set('Authorization', token).send(blogWithNoLikes)

    const theLastBlog = await helper.theLastBlog()

    expect(theLastBlog.likes).toBe(0)
  })

  test('return Bad Request if title is missing', async () => {
    const blogWithNoTitle = {
      author: 'Tester',
      url: 'https://google.com',
      like: 5
    }

    await api.post('/api/blogs')
      .send(blogWithNoTitle)
      .set('Authorization', token)
      .expect(400)

    const blogs = await helper.blogsInDb()

    expect(helper.initBlogs.length).toBe(blogs.length)
  })

  test('return Bad Request if url is missing', async () => {
    const blogWithNoUrl = {
      title: 'New blog title',
      author: 'Tester',
      like: 5
    }

    await api.post('/api/blogs')
      .send(blogWithNoUrl)
      .set('Authorization', token)
      .expect(400)

    const blogs = await helper.blogsInDb()

    expect(helper.initBlogs.length).toBe(blogs.length)
  })

  test('return 401 status code with invalid token message when token message is invalid', async () => {
    const error = await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogs = await helper.blogsInDb()

    expect(error.body.error).toBe('user doesn\'t exist')
    expect(helper.initBlogs.length).toBe(blogs.length)
  })
})

describe('delete blog', () => {
  test('delete blog by valid id', async () => {
    const id = (await helper.blogsInDb())[0].id

    await api.delete(`/api/blogs/${id}`)
      .set('Authorization', token)
      .expect(204)

    const allBlogs = await helper.blogsInDb()
    const deletedBlog = allBlogs.find(b => b.id === id)

    expect(deletedBlog).toBeUndefined()
  })

  test('return 401 status code when try to use not exist user', async () => {
    const blogId = (await helper.blogsInDb())[0].id
    const nonExistedId = await helper.nonExistedId()
    const newToken = 'Bearer ' + await jwt.sign({ id: nonExistedId }, config.SECRET)

    const response = await api.delete(`/api/blogs/${blogId}`)
      .set('Authorization', newToken)
      .expect(401)

    const blogs = await helper.blogsInDb()

    expect(response.body.error).toBe('user doesn\'t exist')
    expect(blogs.length).toBe(helper.initBlogs.length)
  })

  test('return 401 status code when try to delete not your own blog', async () => {
    const user = {
      username: 'Random',
      name: 'Name',
      password: 'Hola'
    }
    const { newToken } = await helper.createTokenWithId(user)
    const blogId = (await helper.blogsInDb())[0].id

    const response = await api.delete(`/api/blogs/${blogId}`)
      .set('Authorization', newToken)
      .expect(401)

    expect(response.body.error).toBe('cannot delete not your own blog')
  })
})

describe('update blog', () => {
  test('update blog by existed id', async () => {
    const id = (await helper.blogsInDb())[0].id

    const updatedNote = {
      title: 'Updated title',
      author: 'Tester',
      url: 'some url',
      likes: 3
    }

    await api.put(`/api/blogs/${id}`)
      .send(updatedNote)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const updatedBlog = allBlogs.find(b => b.id === id)

    expect(updatedBlog.title).toBe(updatedNote.title)
  })
})

afterAll(async () => await mongoose.connection.close())
