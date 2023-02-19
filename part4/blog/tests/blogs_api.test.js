const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initBlogs)
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
      .expect(201)

    const updatedBlogs = await helper.blogsInDb()

    expect(updatedBlogs.length).toBe(helper.initBlogs.length + 1)
  })

  test('return id of created blog', async () => {
    const newId = (await api.post('/api/blogs').send(newBlog)).body.id

    const theLastBlog = await helper.theLastBlog()

    expect(theLastBlog.id).toEqual(newId)
    expect(theLastBlog.title).toEqual(newBlog.title)
  })

  test('insert likes to zero if likes field is missing', async () => {
    const blogWithNoLikes = {
      title: 'New blog title',
      author: 'Tester',
      url: 'https://google.com'
    }

    await api.post('/api/blogs').send(blogWithNoLikes)

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
      .expect(400)

    const blogs = await helper.blogsInDb()

    expect(helper.initBlogs.length).toBe(blogs.length)
  })
})

describe('delete blog', () => {
  test('delete blog by valid id', async () => {
    const id = (await helper.blogsInDb())[0].id

    await api.delete(`/api/blogs/${id}`)
      .expect(204)

    const allBlogs = await helper.blogsInDb()
    const deletedBlog = allBlogs.find(b => b.id === id)

    expect(deletedBlog).toBeUndefined()
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
