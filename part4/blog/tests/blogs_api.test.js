const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of helper.blogs) {
    await (new Blog(blog)).save()
  }
})

describe('get all blogs', () => {
  test('return json type response', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('return exact amount of blogs', async () => {
    const blogs = await api.get('/api/blogs')

    expect(blogs.body.length).toBe(helper.blogs.length)
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
    likes: 0
  }

  test('increase amount of blogs', async () => {
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const updatedBlogs = await helper.blogsInDb()

    expect(updatedBlogs.length).toBe(helper.blogs.length + 1)
  })

  test('return id of created blog', async () => {
    const newId = await api.post('/api/blogs').send(newBlog)

    const allBlogs = await helper.blogsInDb()
    const createdBlog = allBlogs.find(b => b.id === newId.body.id)

    const expected = { ...newBlog, id: newId.body.id }

    expect(createdBlog).toEqual(expected)
  })
})

afterAll(async () => await mongoose.connection.close())
