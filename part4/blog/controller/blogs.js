const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken) {
    return response.status(400).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json({ id: savedBlog._id })
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken) {
    return response.status(400).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user && blog.user.toString() === decodedToken.id) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'cannot delete not your own blog' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter
